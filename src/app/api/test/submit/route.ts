import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import TestResult from "@/models/TestResult";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface AnsweredQuestion {
    questionId: number;
    question: string;
    topic: string;
    tags: string[];
    userAnswer: string;
    correctOptionIndex?: number;      // for MCQs
    options?: string[];               // for MCQs
    isTheory: boolean;
    context?: string;
}

// Grade calculation helper
function calcGrade(pct: number): string {
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "B";
    if (pct >= 60) return "C";
    if (pct >= 50) return "D";
    return "F";
}

// Evaluate theory answer via Gemini
async function evaluateTheoryAnswer(
    question: string,
    context: string,
    userAnswer: string
): Promise<{ score: number; feedback: string }> {
    if (!userAnswer || userAnswer.trim().length < 5) {
        return { score: 0, feedback: "No answer was provided for this question." };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a strict but fair university Java programming exam evaluator. 
    
Question: ${question}
Context/Hint: ${context || "No additional context provided."}
Student Answer: ${userAnswer}

Evaluate the answer on a scale of 0-10 based on:
1. Conceptual correctness (40%)
2. Completeness / Missing key points (40%)
3. Logical flow and clarity (20%)

RESPOND ONLY in this exact JSON format (no markdown, no extra text):
{"score": <number 0-10>, "feedback": "<2-3 sentence critique: what was correct, what was missing.>"}`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                score: Math.min(10, Math.max(0, Math.round(parsed.score))),
                feedback: parsed.feedback || "Answer evaluated.",
            };
        }
    } catch (err) {
        console.error("Gemini evaluation error:", err);
    }
    return { score: 0, feedback: "AI evaluation failed. Please contact support." };
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { questions, subject, testId, testName } =
            (await req.json()) as {
                questions: AnsweredQuestion[];
                subject: string;
                testId: string;
                testName: string;
            };

        // ── Evaluate each question ──────────────────────────────────────────
        const questionResults = await Promise.all(
            questions.map(async (q) => {
                if (!q.isTheory) {
                    // MCQ: instant evaluation
                    const correctOption =
                        q.options && q.correctOptionIndex !== undefined
                            ? q.options[q.correctOptionIndex]
                            : "";
                    const isCorrect = q.userAnswer === correctOption;
                    const unanswered = !q.userAnswer || q.userAnswer.trim() === "";
                    return {
                        questionId: q.questionId,
                        question: q.question,
                        topic: q.topic,
                        tags: q.tags,
                        userAnswer: q.userAnswer || "",
                        correctAnswer: correctOption,
                        score: unanswered ? 0 : isCorrect ? 10 : 0,
                        maxScore: 10,
                        status: unanswered ? "unanswered" : isCorrect ? "correct" : "wrong",
                        aiFeedback: isCorrect
                            ? "Correct! Well done."
                            : unanswered
                            ? "You did not attempt this question."
                            : `Incorrect. The correct answer was: "${correctOption}".`,
                        isTheory: false,
                    };
                } else {
                    // Theory: Gemini evaluation
                    const { score, feedback } = await evaluateTheoryAnswer(
                        q.question,
                        q.context || "",
                        q.userAnswer
                    );
                    const status =
                        !q.userAnswer || q.userAnswer.trim().length < 5
                            ? "unanswered"
                            : score >= 8
                            ? "correct"
                            : score >= 5
                            ? "partial"
                            : "wrong";
                    return {
                        questionId: q.questionId,
                        question: q.question,
                        topic: q.topic,
                        tags: q.tags,
                        userAnswer: q.userAnswer || "",
                        correctAnswer: "",
                        score,
                        maxScore: 10,
                        status,
                        aiFeedback: feedback,
                        isTheory: true,
                    };
                }
            })
        );

        // ── Aggregate topic scores ──────────────────────────────────────────
        const topicMap: Record<string, { score: number; max: number }> = {};
        for (const qr of questionResults) {
            if (!topicMap[qr.topic]) topicMap[qr.topic] = { score: 0, max: 0 };
            topicMap[qr.topic].score += qr.score;
            topicMap[qr.topic].max += qr.maxScore;
        }

        const weakTopics = [];
        const strongTopics = [];
        for (const [topic, { score, max }] of Object.entries(topicMap)) {
            const pct = max > 0 ? Math.round((score / max) * 100) : 0;
            if (pct < 60) {
                weakTopics.push({
                    topic,
                    score,
                    maxScore: max,
                    percentage: pct,
                    priority: pct < 30 ? "high" : pct < 50 ? "medium" : "low",
                });
            } else if (pct >= 80) {
                strongTopics.push({ topic, percentage: pct });
            }
        }

        // ── Overall scores ────────────────────────────────────────────────
        const totalScore = questionResults.reduce((s, q) => s + q.score, 0);
        const maxScore = questionResults.reduce((s, q) => s + q.maxScore, 0);
        const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
        const grade = calcGrade(percentage);

        // ── Generate overall AI suggestion ───────────────────────────────
        let aiSuggestions = "";
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const weakList = weakTopics.map((w) => w.topic).join(", ") || "None";
            const result = await model.generateContent(
                `A student scored ${percentage}% on a Java programming exam. Weak topics: ${weakList}. Write 2-3 sentences of personalized, actionable improvement advice. Be direct and specific.`
            );
            aiSuggestions = result.response.text().trim();
        } catch { /* keep empty if fails */ }

        // ── Save to database ─────────────────────────────────────────────
        const testResult = await TestResult.create({
            userId: user._id,
            userEmail: user.email,
            subject,
            testId,
            testName,
            totalScore,
            maxScore,
            percentage,
            grade,
            questionResults,
            weakTopics,
            strongTopics,
            aiSuggestions,
        });

        return NextResponse.json({ resultId: testResult._id.toString(), percentage, grade });
    } catch (error) {
        console.error("Test submit error:", error);
        const msg = error instanceof Error ? error.message : "Failed to submit test.";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
