interface CircularProgressProps {
    percentage: number;
    label: string;
    stats: {
        mastered: number;
        total: number;
        pending: number;
    };
}

export default function CircularProgress({ percentage, label, stats }: CircularProgressProps) {
    const circumference = 2 * Math.PI * 15.9155;
    const dashArray = `${(percentage / 100) * circumference}, 100`;

    return (
        <div className="bg-white p-8 border border-charcoal/10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-crimson/5 rounded-bl-full -mr-4 -mt-4"></div>
            <h3 className="text-xs font-bold text-charcoal mb-6 uppercase tracking-widest border-b border-charcoal/10 pb-2">
                {label}
            </h3>
            <div className="flex items-center gap-8">
                <div className="relative w-28 h-28 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-stone"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        ></path>
                        <path
                            className="text-crimson"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray={dashArray}
                            strokeWidth="2"
                        ></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-serif font-bold text-charcoal">{percentage}%</span>
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <div className="text-xs text-charcoal/50 uppercase tracking-widest mb-1">
                            Concepts Mastered
                        </div>
                        <div className="text-lg font-serif font-bold text-charcoal">
                            {stats.mastered} / {stats.total}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-charcoal/50 uppercase tracking-widest mb-1">Pending Review</div>
                        <div className="text-lg font-serif font-bold text-charcoal">{stats.pending} Topics</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
