"use client";

import { useState, useRef, useEffect } from "react";
import FormattingToolbar from "./FormattingToolbar";

interface AnswerPanelProps {
    answerType: "write" | "multiple";
    options?: string[];
    currentAnswer: string;
    onAnswerChange: (answer: string) => void;
    onAnswerTypeChange: (type: "write" | "multiple") => void;
    onPrevious: () => void;
    onNext: () => void;
    onMarkForReview: () => void;
    isMarkedForReview: boolean;
}

export default function AnswerPanel({
    answerType,
    options,
    currentAnswer,
    onAnswerChange,
    onAnswerTypeChange,
    onPrevious,
    onNext,
    onMarkForReview,
    isMarkedForReview,
}: AnswerPanelProps) {
    const textareaRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        list: false,
    });

    const updateFormatState = () => {
        setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            list: document.queryCommandState("insertUnorderedList"),
        });
    };

    const handleFormat = (type: "bold" | "italic" | "list") => {
        if (type === "bold") {
            document.execCommand("bold", false, undefined);
        } else if (type === "italic") {
            document.execCommand("italic", false, undefined);
        } else if (type === "list") {
            document.execCommand("insertUnorderedList", false, undefined);
        }

        if (textareaRef.current) {
            onAnswerChange(textareaRef.current.innerHTML);
            textareaRef.current.focus();
        }
        updateFormatState();
    };

    // Update innerHTML when currentAnswer changes (e.g. navigating questions)
    // but avoid updating if the change came from the user typing.
    useEffect(() => {
        if (textareaRef.current && textareaRef.current.innerHTML !== currentAnswer) {
            textareaRef.current.innerHTML = currentAnswer;
        }
    }, [currentAnswer]);

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
                <FormattingToolbar onFormat={handleFormat} activeFormats={activeFormats} />
            </div>

            {/* Answer Input Area */}
            <div className="flex-1 overflow-y-auto p-8 relative bg-editorial-cream">
                <div className="h-full flex flex-col">
                    <label className="sr-only">Your Answer</label>
                    
                    {answerType === "multiple" && options && options.length > 0 ? (
                        <div className="space-y-4 mt-2">
                            {options.map((opt, idx) => {
                                const labels = ["A", "B", "C", "D"];
                                const isSelected = currentAnswer === opt;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => onAnswerChange(opt)}
                                        className={`w-full text-left p-5 border-2 flex items-start gap-4 transition-all duration-200 shadow-sm hover:shadow-md ${isSelected ? 'border-crimson bg-red-50' : 'border-editorial-charcoal/20 bg-white hover:border-editorial-charcoal/40'}`}
                                    >
                                        <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold border-2 rounded-full ${isSelected ? 'border-crimson text-crimson' : 'border-editorial-charcoal text-editorial-charcoal'}`}>
                                            {labels[idx]}
                                        </span>
                                        <span className={`text-[16px] leading-relaxed pt-1 ${isSelected ? 'font-bold text-editorial-charcoal' : 'text-editorial-charcoal/90'}`}>
                                            {opt}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div
                            ref={textareaRef}
                            contentEditable
                            onInput={(e) => onAnswerChange(e.currentTarget.innerHTML)}
                            onKeyUp={updateFormatState}
                            onMouseUp={updateFormatState}
                            className="w-full h-full bg-transparent border-0 focus:ring-0 p-0 text-editorial-charcoal text-[17px] leading-relaxed outline-none overflow-y-auto [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2"
                            style={{ minHeight: "200px" }}
                            data-placeholder="Type your analysis here. Start by identifying the core premise..."
                        />
                    )}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex-none h-[88px] px-6 border-t-2 border-gray-200 bg-white flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                    onClick={onPrevious}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-charcoal text-charcoal font-bold text-xs hover:bg-cream transition-all shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined text-lg">
                        arrow_back
                    </span>
                    Previous
                </button>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMarkForReview}
                        className={`flex items-center gap-2 px-4 py-2 border-2 transition-all uppercase tracking-widest text-xs font-bold shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${isMarkedForReview
                            ? "bg-red-50 border-crimson text-crimson"
                            : "bg-white border-charcoal text-charcoal hover:bg-cream"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">{isMarkedForReview ? 'bookmark_added' : 'bookmark_add'}</span>
                        {isMarkedForReview ? "Marked" : "Mark for Review"}
                    </button>
                    <button
                        onClick={onNext}
                        className="flex items-center gap-2 px-6 py-2.5 bg-crimson text-white font-bold text-xs hover:bg-red-700 transition-all shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none border-2 border-charcoal uppercase tracking-widest"
                    >
                        Next Question
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
