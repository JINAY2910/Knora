"use client";

interface Action {
    label: string;
    icon: string;
    onClick: () => void;
}

interface ExaminerInsightProps {
    insight: string;
    highlightedConcepts?: string[];
    actions: Action[];
}

export default function ExaminerInsight({ insight, highlightedConcepts = [], actions }: ExaminerInsightProps) {
    // Simple highlight function (could be enhanced with regex)
    const highlightText = (text: string) => {
        if (highlightedConcepts.length === 0) return text;

        let result = text;
        highlightedConcepts.forEach((concept) => {
            const regex = new RegExp(`(${concept})`, "gi");
            result = result.replace(
                regex,
                '<strong class="not-italic bg-yellow-200/50 px-1">$1</strong>'
            );
        });
        return result;
    };

    return (
        <div className="bg-white border-2 border-charcoal p-8 relative shadow-sharp">
            <div className="absolute top-0 right-0 p-6 opacity-5">
                <span className="material-symbols-outlined text-9xl text-charcoal">psychology</span>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                <div className="p-4 bg-charcoal text-cream shrink-0 border-2 border-charcoal">
                    <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                </div>
                <div className="space-y-4 flex-grow">
                    <div className="border-b border-charcoal/10 pb-4">
                        <h3 className="text-2xl font-serif font-bold text-charcoal flex items-center gap-3">
                            Examiner Insight
                            <span className="px-2 py-1 bg-crimson text-white text-[10px] uppercase font-bold tracking-widest">
                                Actionable
                            </span>
                        </h3>
                        <p className="text-xs font-bold text-charcoal/50 mt-1 uppercase tracking-widest">
                            Analysis of 12 essay responses
                        </p>
                    </div>
                    <p
                        className="text-charcoal text-lg font-serif leading-relaxed italic border-l-4 border-crimson pl-4 bg-cream/30 py-2"
                        dangerouslySetInnerHTML={{ __html: highlightText(insight) }}
                    />
                    <div className="flex flex-wrap gap-4 pt-2">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal border-b-2 border-transparent hover:border-crimson transition-all py-1"
                            >
                                <span className="material-symbols-outlined text-sm text-crimson">{action.icon}</span>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
