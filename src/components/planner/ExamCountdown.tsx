interface ExamCountdownProps {
    examName: string;
    daysRemaining: number;
    hoursRemaining: number;
    readinessScore: number;
    progress: number;
    onStartSession: () => void;
}

export default function ExamCountdown({
    examName,
    daysRemaining,
    hoursRemaining,
    readinessScore,
    progress,
    onStartSession,
}: ExamCountdownProps) {
    return (
        <div className="relative bg-charcoal text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
            <div className="relative z-10 w-full md:w-auto flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold bg-crimson text-white uppercase tracking-widest">
                        Next Exam
                    </span>
                    <span className="text-stone font-serif italic text-lg">{examName}</span>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-6xl font-serif font-bold text-white">{daysRemaining}</span>
                    <span className="text-stone font-medium text-sm uppercase tracking-wider mr-6">Days</span>
                    <span className="text-6xl font-serif font-bold text-white">
                        {hoursRemaining.toString().padStart(2, "0")}
                    </span>
                    <span className="text-stone font-medium text-sm uppercase tracking-wider">Hours</span>
                </div>
                <div className="mt-8 w-full bg-white/10 h-1">
                    <div className="bg-crimson h-1" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="relative z-10 flex flex-col items-end gap-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <div className="text-right">
                    <span className="block text-xs font-bold text-stone uppercase tracking-widest mb-1">
                        Readiness Score
                    </span>
                    <span className="text-4xl font-serif font-bold text-white">{readinessScore}%</span>
                </div>
                <button
                    onClick={onStartSession}
                    className="w-full md:w-auto px-8 py-3 bg-white text-charcoal hover:bg-crimson hover:text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                >
                    Start Session <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
