"use client";

interface LogicalGap {
    type: string;
    icon: string;
    title: string;
    description: string;
    questionRef: number;
}

interface LogicalGapsListProps {
    gaps: LogicalGap[];
}

export default function LogicalGapsList({ gaps }: LogicalGapsListProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-crimson">
                <h4 className="text-lg font-serif font-bold text-crimson">Logical Gaps</h4>
                <span className="material-symbols-outlined text-crimson text-xl">warning_amber</span>
            </div>
            {gaps.map((gap, index) => (
                <div
                    key={index}
                    className="bg-white p-5 border-l-4 border-crimson border-y border-r border-charcoal/20 hover:border-charcoal transition-colors cursor-pointer group"
                >
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-crimson text-sm mt-1">{gap.icon}</span>
                        <div>
                            <p className="text-base font-serif font-bold text-charcoal group-hover:underline decoration-crimson decoration-2 underline-offset-2">
                                {gap.title}
                            </p>
                            <p className="text-sm text-charcoal-light mt-1 leading-relaxed">{gap.description}</p>
                            <div className="mt-3 inline-flex items-center text-[10px] text-crimson font-bold uppercase tracking-widest border-b border-crimson pb-0.5">
                                See Question {gap.questionRef}{" "}
                                <span className="material-symbols-outlined text-[10px] ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
