interface AssessmentHeaderProps {
    examType: string;
    title: string;
    date: string;
    duration: string;
    score: number;
    totalScore: number;
    grade: string;
    status: "Completed" | "In Progress" | "Pending";
}

export default function AssessmentHeader({
    examType,
    title,
    date,
    duration,
    score,
    totalScore,
    grade,
    status,
}: AssessmentHeaderProps) {
    const statusIcons = {
        Completed: "check_circle",
        "In Progress": "pending",
        Pending: "schedule",
    };

    return (
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
            <div className="border-l-4 border-crimson pl-6 py-1">
                <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 text-xs font-bold bg-charcoal text-cream uppercase tracking-widest">
                        {examType}
                    </span>
                    <span className="text-sm font-medium text-charcoal-light font-serif italic">
                        {date} — {duration} Duration
                    </span>
                </div>
                <h1
                    className="text-4xl md:text-5xl font-serif font-bold text-charcoal leading-none mb-2"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            </div>
            <div className="flex items-center gap-10 bg-white p-6 border-2 border-charcoal shadow-sharp">
                <div className="text-right hidden md:block">
                    <p className="text-xs uppercase tracking-widest text-charcoal-light mb-1 font-bold">Status</p>
                    <p className="text-sm font-bold text-charcoal flex items-center justify-end gap-1 uppercase">
                        <span className="material-symbols-outlined text-sm text-charcoal">{statusIcons[status]}</span> {status}
                    </p>
                </div>
                <div className="h-10 w-px bg-charcoal/20 hidden md:block"></div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-charcoal-light font-bold">Total Score</p>
                        <p className="text-5xl font-serif font-bold text-crimson">
                            {score}
                            <span className="text-2xl text-charcoal font-sans">/{totalScore}</span>
                        </p>
                    </div>
                    <div className="w-16 h-16 relative flex items-center justify-center border-4 border-charcoal rounded-full bg-cream">
                        <span className="font-serif text-xl font-bold text-charcoal">{grade}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
