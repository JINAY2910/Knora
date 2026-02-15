"use client";

import { useState } from "react";
import FormattingToolbar from "./FormattingToolbar";

interface AnswerPanelProps {
    answerType: "write" | "multiple";
    currentAnswer: string;
    onAnswerChange: (answer: string) => void;
    onAnswerTypeChange: (type: "write" | "multiple") => void;
    onPrevious: () => void;
    onNext: () => void;
    onMarkForReview: () => void;
    onAskHint: () => void;
    isMarkedForReview: boolean;
}

export default function AnswerPanel({
    answerType,
    currentAnswer,
    onAnswerChange,
    onAnswerTypeChange,
    onPrevious,
    onNext,
    onMarkForReview,
    onAskHint,
    isMarkedForReview,
}: AnswerPanelProps) {
    const handleFormat = (type: "bold" | "italic" | "list") => {
        // Simple formatting implementation (could be enhanced)
        console.log(`Format: ${type}`);
    };

    return (
        <section className="w-1/2 flex flex-col bg-editorial-cream relative z-10 shadow-xl border-l border-editorial-charcoal/10">
            {/* Toolbar */}
            <div className="flex-none px-6 py-3 border-b border-editorial-charcoal/10 flex items-center justify-between bg-editorial-cream">
                <div className="flex items-center gap-1 bg-editorial-charcoal/5 p-1 border border-editorial-charcoal/10">
                    <button
                        onClick={() => onAnswerTypeChange("write")}
                        className={`px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-wide ${answerType === "write"
                                ? "bg-white text-editorial-charcoal shadow-sm border border-editorial-charcoal/10"
                                : "text-editorial-charcoal/50 hover:text-editorial-charcoal"
                            }`}
                    >
                        Write Answer
                    </button>
                    <button
                        onClick={() => onAnswerTypeChange("multiple")}
                        className={`px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-wide ${answerType === "multiple"
                                ? "bg-white text-editorial-charcoal shadow-sm border border-editorial-charcoal/10"
                                : "text-editorial-charcoal/50 hover:text-editorial-charcoal"
                            }`}
                    >
                        Multiple Choice
                    </button>
                </div>
                <FormattingToolbar onFormat={handleFormat} />
            </div>

            {/* AI Hint Button */}
            <button
                onClick={onAskHint}
                className="absolute top-20 right-6 z-20 flex items-center gap-2 pl-3 pr-4 py-2 bg-editorial-charcoal text-white shadow-lg hover:shadow-xl hover:bg-black transition-all group border border-editorial-charcoal"
            >
                <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                <span className="text-xs font-bold tracking-wide group-hover:pr-1 transition-all uppercase">
                    Ask AI Hint
                </span>
            </button>

            {/* Answer Input Area */}
            <div className="flex-1 overflow-y-auto p-8 relative bg-editorial-cream">
                <div className="h-full flex flex-col">
                    <label className="sr-only">Your Answer</label>
                    <textarea
                        value={currentAnswer}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        className="w-full h-full bg-transparent border-0 focus:ring-0 p-0 text-editorial-charcoal text-lg leading-relaxed resize-none placeholder-editorial-charcoal/40 font-mono"
                        placeholder="Type your analysis here. Start by identifying the core premise..."
                    />
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex-none p-6 border-t border-editorial-charcoal/10 bg-editorial-cream flex items-center justify-between">
                <button
                    onClick={onPrevious}
                    className="flex items-center gap-2 text-editorial-charcoal/60 hover:text-editorial-charcoal transition-colors text-sm font-bold group uppercase tracking-wide"
                >
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                        arrow_back
                    </span>
                    Previous
                </button>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMarkForReview}
                        className={`flex items-center gap-2 px-4 py-2 border transition-colors uppercase tracking-wide text-sm font-bold ${isMarkedForReview
                                ? "bg-primary/10 border-primary text-primary"
                                : "border-editorial-charcoal/20 hover:bg-white hover:border-editorial-charcoal text-editorial-charcoal"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg text-primary">flag</span>
                        {isMarkedForReview ? "Marked" : "Mark for Review"}
                    </button>
                    <button
                        onClick={onNext}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] hover:shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-x-[2px] hover:translate-y-[2px] border border-editorial-charcoal uppercase tracking-widest"
                    >
                        Next Question
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
