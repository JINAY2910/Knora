export default function GoalsWidget() {
    const goals = [
        {
            date: "24",
            month: "Oct",
            title: "Database Mid-Term",
            type: "MOCK TEST",
            duration: "2 HRS",
        },
        {
            date: "28",
            month: "Oct",
            title: "Network Layers Quiz",
            type: "PRACTICE",
            duration: "30 MINS",
        },
    ];

    return (
        <div className="bg-white p-6 border-2 border-charcoal">
            <h3 className="text-sm font-bold text-charcoal mb-6 uppercase tracking-wide pb-3 border-b border-gray-200">
                Upcoming Goals
            </h3>
            <div className="space-y-4">
                {goals.map((goal, index) => (
                    <div key={index} className="flex gap-3 items-start cursor-pointer group">
                        <div className="w-12 h-12 bg-cream flex-shrink-0 flex flex-col items-center justify-center border-2 border-charcoal">
                            <span className="text-[8px] text-charcoal/60 uppercase font-bold tracking-widest">
                                {goal.month}
                            </span>
                            <span className="text-lg font-bold text-crimson leading-none font-serif">{goal.date}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-charcoal group-hover:text-crimson transition-colors leading-tight">
                                {goal.title}
                            </h4>
                            <p className="text-[10px] text-charcoal/40 font-mono mt-0.5 uppercase tracking-wide">
                                {goal.type} • {goal.duration}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-5 py-2.5 border-2 border-dashed border-gray-300 text-[11px] font-bold text-charcoal/40 hover:text-charcoal hover:border-charcoal transition-colors uppercase tracking-wide">
                + Add Custom Goal
            </button>
        </div>
    );
}
