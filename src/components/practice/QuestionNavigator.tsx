"use client";

interface QuestionNavigatorProps {
    totalQuestions: number;
    currentQuestion: number;
    answeredQuestions: number[];
    onNavigate: (questionNum: number) => void;
}

export default function QuestionNavigator({
    totalQuestions,
    currentQuestion,
    answeredQuestions,
    onNavigate,
}: QuestionNavigatorProps) {
    // Generate question numbers to show (show first 3, current context, and last)
    const getVisibleQuestions = () => {
        const questions: (number | "ellipsis")[] = [];

        // Always show first 3
        for (let i = 1; i <= Math.min(3, totalQuestions); i++) {
            questions.push(i);
        }

        // Show current question and neighbors
        if (currentQuestion > 4) {
            questions.push("ellipsis");
        }

        const start = Math.max(4, currentQuestion - 1);
        const end = Math.min(totalQuestions - 1, currentQuestion + 1);

        for (let i = start; i <= end; i++) {
            if (!questions.includes(i)) {
                questions.push(i);
            }
        }

        // Show last question
        if (currentQuestion < totalQuestions - 2) {
            questions.push("ellipsis");
        }

        if (!questions.includes(totalQuestions) && totalQuestions > 3) {
            questions.push(totalQuestions);
        }

        return questions;
    };

    const visibleQuestions = getVisibleQuestions();

    return (
        <div className="flex-none px-6 py-4 border-b border-editorial-charcoal/10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-editorial-charcoal/60 mr-2 tracking-wider">
                    Nav
                </span>
                {visibleQuestions.map((q, index) => {
                    if (q === "ellipsis") {
                        return (
                            <span key={`ellipsis-${index}`} className="text-editorial-charcoal/40 text-xs mx-1 font-serif">
                                ...
                            </span>
                        );
                    }

                    const isAnswered = answeredQuestions.includes(q);
                    const isCurrent = q === currentQuestion;

                    return (
                        <button
                            key={q}
                            onClick={() => onNavigate(q)}
                            className={`
                                ${isCurrent ? "w-9 h-9 bg-primary text-white border-editorial-charcoal shadow-[2px_2px_0px_0px_rgba(55,56,51,0.2)] transform scale-105 text-sm font-bold" : ""}
                                ${!isCurrent && isAnswered ? "w-8 h-8 bg-white border-editorial-charcoal/20 text-editorial-charcoal text-xs font-bold" : ""}
                                ${!isCurrent && !isAnswered ? "w-8 h-8 bg-transparent border-editorial-charcoal/20 text-editorial-charcoal/40 text-xs font-medium" : ""}
                                flex items-center justify-center border hover:bg-editorial-charcoal hover:text-white transition-colors
                            `}
                        >
                            {q}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
