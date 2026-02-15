"use client";

import { useState } from "react";

interface Issue {
    type: "error" | "success";
    title: string;
    description: string;
}

interface Question {
    id: number;
    question: string;
    studentAnswer: string;
    score: number;
    totalScore: number;
    status: "Logical Gap" | "Perfect Score" | "Partial Credit";
    issues: Issue[];
}

interface AnswerTranscriptProps {
    questions: Question[];
}

export default function AnswerTranscript({ questions }: AnswerTranscriptProps) {
    const [filter, setFilter] = useState<"all" | "errors">("all");
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(questions[0]?.id || null);

    const filteredQuestions = questions.filter((q) => {
        if (filter === "errors") {
            return q.status !== "Perfect Score";
        }
        return true;
    });

    const toggleQuestion = (id: number) => {
        setExpandedQuestion(expandedQuestion === id ? null : id);
    };

    return (
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-8 border-b border-charcoal pb-4">
                <h2 className="text-3xl font-serif font-bold text-charcoal">Answer Transcript</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${filter === "all"
                            ? "text-charcoal border-2 border-charcoal bg-white"
                            : "text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream"
                            }`}
                    >
                        Show All
                    </button>
                    <button
                        onClick={() => setFilter("errors")}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${filter === "errors"
                            ? "text-white bg-crimson border-2 border-crimson"
                            : "text-crimson bg-crimson/5 border border-crimson hover:bg-crimson hover:text-white"
                            }`}
                    >
                        Errors Only
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {filteredQuestions.map((question) => {
                    const isExpanded = expandedQuestion === question.id;
                    const isPerfect = question.status === "Perfect Score";

                    return (
                        <div
                            key={question.id}
                            className={`${isPerfect
                                ? "bg-white border border-charcoal border-dashed hover:border-solid hover:border-2"
                                : "bg-white border-2 border-charcoal shadow-sharp"
                                } transition-all cursor-pointer ${isPerfect ? "opacity-70 hover:opacity-100" : ""}`}
                        >
                            <div
                                className="p-4 bg-charcoal text-cream flex justify-between items-center border-b border-charcoal"
                                onClick={() => toggleQuestion(question.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-10 h-10 bg-cream text-charcoal font-serif font-bold text-lg border-2 border-cream">
                                        Q{question.id}
                                    </span>
                                    <span className="text-base font-medium font-serif italic">
                                        {question.question}
                                    </span>
                                </div>
                                <div className="flex items-center gap-6">
                                    {question.status !== "Perfect Score" && (
                                        <span className="px-3 py-1 bg-crimson text-white text-xs font-bold uppercase tracking-widest">
                                            {question.status}
                                        </span>
                                    )}
                                    {question.status === "Perfect Score" && (
                                        <span className="px-2 py-1 border border-cream text-cream text-[10px] font-bold uppercase tracking-widest">
                                            Perfect Score
                                        </span>
                                    )}
                                    <span className="text-lg font-serif font-bold">
                                        {question.score}/{question.totalScore}
                                    </span>
                                    <span className="material-symbols-outlined text-charcoal">
                                        {isExpanded ? "expand_less" : "expand_more"}
                                    </span>
                                </div>
                            </div>

                            {isExpanded && !isPerfect && (
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-8 border-b md:border-b-0 md:border-r border-charcoal bg-paper">
                                        <p className="text-xs uppercase tracking-widest font-bold text-charcoal/50 mb-4">
                                            Student Response
                                        </p>
                                        <p
                                            className="text-charcoal text-base leading-loose font-serif"
                                            dangerouslySetInnerHTML={{ __html: question.studentAnswer }}
                                        />
                                    </div>
                                    <div className="p-8 bg-white">
                                        <p className="text-xs uppercase tracking-widest font-bold text-crimson mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">auto_awesome</span> AI Critique
                                        </p>
                                        <div className="space-y-6">
                                            {question.issues.map((issue, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex gap-4 p-4 border-l-2 ${issue.type === "error"
                                                        ? "border-crimson bg-crimson/5"
                                                        : "border-charcoal bg-gray-50"
                                                        }`}
                                                >
                                                    <span
                                                        className={`material-symbols-outlined text-base mt-1 ${issue.type === "error" ? "text-crimson" : "text-charcoal"
                                                            }`}
                                                    >
                                                        {issue.type === "error" ? "warning" : "check"}
                                                    </span>
                                                    <div>
                                                        <p className="text-base text-charcoal font-bold font-serif">
                                                            {issue.title}
                                                        </p>
                                                        <p className="text-sm text-charcoal-light mt-1 leading-relaxed">
                                                            {issue.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isExpanded && isPerfect && (
                                <div className="p-6 text-center text-charcoal/60">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-charcoal">emoji_events</span>
                                    <p className="font-serif italic">Perfect answer - no critique needed!</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
