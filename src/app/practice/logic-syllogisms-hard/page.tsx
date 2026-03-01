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
        topic: "Java Concurrency",
        question:
            "Analyze the following thread execution scenario and identify the concurrency issue. Explain how to resolve it using appropriate synchronization.",
        context:
            'Two threads (Thread A and Thread B) are simultaneously accessing a shared bank account object to withdraw funds. The withdraw method checks if the balance is sufficient, then sleeps for 100ms before deducting the amount. Both threads pass the balance check before either deducts the amount, resulting in a negative balance.',
        figure: {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9MuLWML_jbMIvzFlebH0p9mBTdVw1YNz6U-lANG1fwN_KSRH2SYMVqOWGedwgzLavMmG7mI9rMC-eVWVdmSky0MUFzk2fBIMW2DqLuR_Ok6jfxtnwrdJD3lXvUdpG8IAqC6HMCHMPMp8lsug4l5GtoP2uv0Sa1dM-U65kVkMkSgVSgzjQUlO8QjH32p_C8D_VoIqgtaahgXsC1DSwfmBG48TN-KkA1rg6GUJIWNRYfUw9JkGozJMNkCSeBuSdnzt5FAk8O_KcHN0",
            alt: "Race Condition Diagram",
            caption: "Figure 1.1: Race Condition in Thread Execution",
        },
        tags: ["#Java", "#Concurrency", "#RaceCondition"],
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
                subject="Java Programming"
                section="Section 3: Concurrency"
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
