export default function VelocityWidget() {
    const days = [
        { label: "M", height: 30 },
        { label: "T", height: 45 },
        { label: "W", height: 25 },
        { label: "T", height: 60 },
        { label: "TODAY", height: 80, active: true },
        { label: "S", height: 50, future: true },
        { label: "S", height: 40, future: true },
    ];

    return (
        <div className="bg-white p-6 border-2 border-charcoal">
            <h3 className="text-sm font-bold text-charcoal mb-6 flex items-center gap-2 uppercase tracking-wide pb-3 border-b border-gray-200">
                <span className="material-symbols-outlined text-crimson text-base">show_chart</span>
                Learning Velocity
            </h3>
            <div className="relative h-36 w-full mb-3">
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between gap-1.5">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`flex-1 relative group ${day.future
                                    ? "bg-gray-100"
                                    : day.active
                                        ? "bg-crimson"
                                        : "bg-gray-300 hover:bg-charcoal"
                                } transition-colors`}
                            style={{ height: `${day.height}%` }}
                        >
                            <div
                                className={`absolute ${day.active ? "-top-5" : "-top-5 opacity-0 group-hover:opacity-100"
                                    } left-1/2 -translate-x-1/2 text-[9px] font-bold ${day.active ? "text-crimson" : "text-charcoal"
                                    } transition-opacity uppercase tracking-wide`}
                            >
                                {day.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-xs text-charcoal/60 text-center border-t border-gray-200 pt-3">
                You're in the top <span className="text-crimson font-bold">15%</span> of your batch.
            </p>
        </div>
    );
}
