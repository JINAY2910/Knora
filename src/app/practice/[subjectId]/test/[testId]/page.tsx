"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import PracticeHeader from "@/components/practice/PracticeHeader";
import QuestionNavigator from "@/components/practice/QuestionNavigator";
import QuestionPanel from "@/components/practice/QuestionPanel";
import AnswerPanel from "@/components/practice/AnswerPanel";
import TestHintChatbot from "@/components/practice/TestHintChatbot";

import { half1Questions, half2Questions, fullQuestions } from "@/data/javaPracticeQuestions";

export default function PracticePage({ params }: { params: Promise<{ subjectId: string, testId: string }> }) {
    const { subjectId, testId } = use(params);
    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [markedForReview, setMarkedForReview] = useState<number[]>([]);
    const [answerTypeState, setAnswerTypeState] = useState<"write" | "multiple">("write");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHintOpen, setIsHintOpen] = useState(false);

    // Dynamic Header Info based on URL
    const subjectName = subjectId === "cpp-programming" ? "C++ Programming" : "Java Programming";
    let testName = "Practice Test";
    let testDifficulty: "Easy" | "Medium" | "Hard" | "Exam Level" = "Medium";
    let timeLimit = "45:00";

    if (testId === "half-1") {
        testName = "1st Half Modules";
        testDifficulty = "Medium";
    } else if (testId === "half-2") {
        testName = "2nd Half Modules";
        testDifficulty = "Hard";
    } else if (testId === "full") {
        testName = "Full Syllabus Exam";
        testDifficulty = "Exam Level";
        timeLimit = "180:00";
    }

    const [timeRemaining, setTimeRemaining] = useState(timeLimit);

    let testQuestions = fullQuestions;
    if (testId === "half-1") testQuestions = half1Questions;
    else if (testId === "half-2") testQuestions = half2Questions;

    const question = testQuestions[currentQuestion - 1];
    const currentAnswer = answers[currentQuestion] || "";
    const answeredQuestions = Object.keys(answers).map(Number);
    const isMarkedForReview = markedForReview.includes(currentQuestion);

    const currentAnswerType = (question as any).options ? "multiple" : answerTypeState;

    const handleNavigate = (questionNum: number) => setCurrentQuestion(questionNum);

    const handleAnswerChange = (answer: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
    };

    const handleNext = () => {
        if (currentQuestion < testQuestions.length) setCurrentQuestion(currentQuestion + 1);
    };

    const handleMarkForReview = () => {
        setMarkedForReview((prev) =>
            prev.includes(currentQuestion)
                ? prev.filter((q) => q !== currentQuestion)
                : [...prev, currentQuestion]
        );
    };

    const handleSubmit = async () => {
        const answeredCount = Object.keys(answers).length;
        const totalQuestions = testQuestions.length;

        if (answeredCount < totalQuestions) {
            const proceed = confirm(
                `You have answered ${answeredCount} of ${totalQuestions} questions. Submit anyway?`
            );
            if (!proceed) return;
        } else {
            const proceed = confirm("Submit your test for AI evaluation? This cannot be undone.");
            if (!proceed) return;
        }

        setIsSubmitting(true);

        // Build the payload — map questions to answered format
        const questionsPayload = testQuestions.map((q: any) => ({
            questionId: q.id,
            question: q.question,
            topic: q.topic,
            tags: q.tags || [],
            userAnswer: answers[q.id] || "",
            correctOptionIndex: q.correctOptionIndex,
            options: q.options,
            isTheory: !q.options,
            context: q.context || "",
        }));

        try {
            const res = await fetch("/api/test/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    questions: questionsPayload,
                    subject: subjectName,
                    testId,
                    testName,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Submission failed.");

            // Redirect to result page
            router.push(`/practice/${subjectId}/test/${testId}/result/${data.resultId}`);
        } catch (err: any) {
            console.error("Submit error:", err);
            alert(`Submission failed: ${err.message}`);
            setIsSubmitting(false);
        }
    };

    const handleAskHint = () => setIsHintOpen(true);

    // Evaluating overlay
    if (isSubmitting) {
        return (
            <div className="bg-cream text-charcoal font-sans h-screen flex flex-col items-center justify-center gap-6">
                <span className="material-symbols-outlined text-7xl text-crimson animate-pulse">auto_awesome</span>
                <div className="text-center">
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Evaluating Your Test</h2>
                    <p className="text-charcoal/60 text-sm font-medium">
                        The AI Tutor is reviewing your theory answers and computing your scores.<br />
                        This usually takes 20–40 seconds.
                    </p>
                </div>
                <div className="flex gap-2 mt-2">
                    {[0, 0.2, 0.4].map((d, i) => (
                        <span key={i} className="w-2.5 h-2.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream text-charcoal font-sans h-screen flex flex-col overflow-hidden">
            <PracticeHeader
                subject={subjectName}
                section={testName}
                timeRemaining={timeRemaining}
                difficulty={testDifficulty}
                onSubmit={handleSubmit}
                onAskHint={handleAskHint}
            />

            <TestHintChatbot
                isOpen={isHintOpen}
                onClose={() => setIsHintOpen(false)}
                questionNumber={question.id}
                questionText={question.question}
                topic={question.topic}
                tags={question.tags}
            />

            <main className="flex-1 flex overflow-hidden">
                {/* Question Panel */}
                <section className="w-1/2 flex flex-col border-r border-editorial-charcoal/20 bg-[#f4f5f2] relative">
                    <QuestionNavigator
                        totalQuestions={testQuestions.length}
                        currentQuestion={currentQuestion}
                        answeredQuestions={answeredQuestions}
                        onNavigate={handleNavigate}
                    />

                    <QuestionPanel
                        questionNumber={question.id}
                        topic={question.topic}
                        question={question.question}
                        context={question.context}
                        figure={(question as any).figure}
                        tags={question.tags}
                    />

                    <div className="flex-none h-[88px] px-6 border-t-2 border-gray-200 bg-[#f4f5f2] flex items-center gap-2">
                        {question.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 bg-white border border-charcoal/20 text-xs font-bold text-charcoal/70 uppercase tracking-widest shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                <AnswerPanel
                    answerType={currentAnswerType}
                    options={(question as any).options}
                    currentAnswer={currentAnswer}
                    onAnswerChange={handleAnswerChange}
                    onAnswerTypeChange={setAnswerTypeState}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onMarkForReview={handleMarkForReview}
                    isMarkedForReview={isMarkedForReview}
                />
            </main>
        </div>
    );
}
