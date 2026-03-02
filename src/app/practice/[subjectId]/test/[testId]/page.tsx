"use client";

import { useState, use } from "react";
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

export default function PracticePage({ params }: { params: Promise<{ subjectId: string, testId: string }> }) {
    const { subjectId, testId } = use(params);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [markedForReview, setMarkedForReview] = useState<number[]>([]);
    const [answerType, setAnswerType] = useState<"write" | "multiple">("write");

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

    // Generate accurate number of questions based on test type
    const testQuestions = Array.from({ length: questionCount }, (_, i) => ({
        ...mockQuestions[0],
        id: i + 1,
    }));

    const question = testQuestions[currentQuestion - 1];
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
                    answerType={answerType}
                    currentAnswer={currentAnswer}
                    onAnswerChange={handleAnswerChange}
                    onAnswerTypeChange={setAnswerType}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onMarkForReview={handleMarkForReview}
                    isMarkedForReview={isMarkedForReview}
                />
            </main>
        </div>
    );
}
