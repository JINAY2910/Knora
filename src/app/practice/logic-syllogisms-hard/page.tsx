"use client";

import { useState } from "react";
import PracticeHeader from "@/components/practice/PracticeHeader";
import QuestionNavigator from "@/components/practice/QuestionNavigator";
import QuestionPanel from "@/components/practice/QuestionPanel";
import AnswerPanel from "@/components/practice/AnswerPanel";

// Mock question data
const mockQuestions = [
    {
        id: 1,
        topic: "Logical Fallacies",
        question:
            "Analyze the following argument and identify the logical fallacy being committed. Explain why it undermines the conclusion.",
        context:
            '"Professor Smith suggests that we should increase the budget for the arts department. But Professor Smith drives an expensive sports car and clearly doesn\'t understand the financial struggles of the average student. Therefore, his proposal to increase the arts budget is flawed."',
        figure: {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9MuLWML_jbMIvzFlebH0p9mBTdVw1YNz6U-lANG1fwN_KSRH2SYMVqOWGedwgzLavMmG7mI9rMC-eVWVdmSky0MUFzk2fBIMW2DqLuR_Ok6jfxtnwrdJD3lXvUdpG8IAqC6HMCHMPMp8lsug4l5GtoP2uv0Sa1dM-U65kVkMkSgVSgzjQUlO8QjH32p_C8D_VoIqgtaahgXsC1DSwfmBG48TN-KkA1rg6GUJIWNRYfUw9JkGozJMNkCSeBuSdnzt5FAk8O_KcHN0",
            alt: "Abstract geometric diagram representing logical structure",
            caption: "Figure 1.1: Argument Structure",
        },
        tags: ["#CriticalThinking", "#AdHominem"],
    },
    // Add more mock questions as needed
];

// Generate 50 questions (for demo)
const allQuestions = Array.from({ length: 50 }, (_, i) => ({
    ...mockQuestions[0],
    id: i + 1,
}));

export default function PracticePage() {
    const [currentQuestion, setCurrentQuestion] = useState(12);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [markedForReview, setMarkedForReview] = useState<number[]>([]);
    const [answerType, setAnswerType] = useState<"write" | "multiple">("write");
    const [timeRemaining, setTimeRemaining] = useState("45:00");

    const question = allQuestions[currentQuestion - 1];
    const currentAnswer = answers[currentQuestion] || "";
    const answeredQuestions = Object.keys(answers).map(Number);
    const isMarkedForReview = markedForReview.includes(currentQuestion);

    const handleNavigate = (questionNum: number) => {
        setCurrentQuestion(questionNum);
    };

    const handleAnswerChange = (answer: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: answer,
        }));
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < allQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleMarkForReview = () => {
        setMarkedForReview((prev) =>
            prev.includes(currentQuestion)
                ? prev.filter((q) => q !== currentQuestion)
                : [...prev, currentQuestion]
        );
    };

    const handleSubmit = () => {
        if (confirm("Are you sure you want to submit the test?")) {
            alert("Test submitted!");
        }
    };

    const handleSettings = () => {
        alert("Settings clicked");
    };

    const handleAskHint = () => {
        alert("AI Hint requested");
    };

    return (
        <div className="bg-editorial-bg-question text-editorial-charcoal font-display h-screen flex flex-col overflow-hidden">
            <PracticeHeader
                subject="Advanced Logic"
                section="Section 3: Syllogisms"
                timeRemaining={timeRemaining}
                difficulty="Hard"
                onSubmit={handleSubmit}
                onSettings={handleSettings}
            />

            <main className="flex-1 flex overflow-hidden">
                {/* Question Panel */}
                <section className="w-1/2 flex flex-col border-r border-editorial-charcoal/20 bg-[#f4f5f2] relative">
                    <QuestionNavigator
                        totalQuestions={allQuestions.length}
                        currentQuestion={currentQuestion}
                        answeredQuestions={answeredQuestions}
                        onNavigate={handleNavigate}
                    />

                    <QuestionPanel
                        questionNumber={question.id}
                        topic={question.topic}
                        question={question.question}
                        context={question.context}
                        figure={question.figure}
                        tags={question.tags}
                    />

                    {/* Tags at bottom */}
                    <div className="flex-none p-4 border-t border-editorial-charcoal/10 flex gap-2 bg-[#f4f5f2]">
                        {question.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-white border border-editorial-charcoal/20 text-xs font-bold text-editorial-charcoal/70 uppercase tracking-wide"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Answer Panel */}
                <AnswerPanel
                    answerType={answerType}
                    currentAnswer={currentAnswer}
                    onAnswerChange={handleAnswerChange}
                    onAnswerTypeChange={setAnswerType}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onMarkForReview={handleMarkForReview}
                    onAskHint={handleAskHint}
                    isMarkedForReview={isMarkedForReview}
                />
            </main>
        </div>
    );
}
