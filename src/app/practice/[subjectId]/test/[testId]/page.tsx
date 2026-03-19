"use client";

import { useState, use } from "react";
import PracticeHeader from "@/components/practice/PracticeHeader";
import QuestionNavigator from "@/components/practice/QuestionNavigator";
import QuestionPanel from "@/components/practice/QuestionPanel";
import AnswerPanel from "@/components/practice/AnswerPanel";

import { half1Questions, half2Questions, fullQuestions } from "@/data/javaPracticeQuestions";

export default function PracticePage({ params }: { params: Promise<{ subjectId: string, testId: string }> }) {
    const { subjectId, testId } = use(params);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [markedForReview, setMarkedForReview] = useState<number[]>([]);
    const [answerTypeState, setAnswerTypeState] = useState<"write" | "multiple">("write");

    // Dynamic Header Info based on URL
    const subjectName = subjectId === "cpp-programming" ? "C++ Programming" : "Java Programming";
    let testName = "Practice Test";
    let testDifficulty: "Easy" | "Medium" | "Hard" | "Exam Level" = "Medium";
    let timeLimit = "45:00";
    let questionCount = 25;

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
        questionCount = 50;
    }

    const [timeRemaining, setTimeRemaining] = useState(timeLimit);

    let testQuestions = fullQuestions;
    if (testId === "half-1") testQuestions = half1Questions;
    else if (testId === "half-2") testQuestions = half2Questions;

    const question = testQuestions[currentQuestion - 1];
    const currentAnswer = answers[currentQuestion] || "";
    const answeredQuestions = Object.keys(answers).map(Number);
    const isMarkedForReview = markedForReview.includes(currentQuestion);
    
    // Resolve computed answer type dynamically based on options presence
    const currentAnswerType = (question as any).options ? "multiple" : answerTypeState;

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
        if (currentQuestion < testQuestions.length) {
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

    const handleAskHint = () => {
        alert("AI Hint requested");
    };

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

                    {/* Tags at bottom */}
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
