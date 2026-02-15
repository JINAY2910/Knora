interface StatCardProps {
    label: string;
    value: number;
    total?: number;
    suffix?: string;
    accentColor?: "charcoal" | "crimson";
}

export default function StatCard({ label, value, total, suffix = "", accentColor = "charcoal" }: StatCardProps) {
    const cornerColors = {
        charcoal: "bg-charcoal",
        crimson: "bg-crimson",
    };

    return (
        <div className="bg-paper border-2 border-charcoal p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div
                className={`absolute top-0 right-0 w-16 h-16 ${cornerColors[accentColor]} transform rotate-45 translate-x-8 -translate-y-8`}
            ></div>
            <p className="text-xs text-charcoal/60 uppercase tracking-widest font-bold mb-2">{label}</p>
            <p className="text-4xl font-serif font-bold text-charcoal">
                {value}
                {total !== undefined && (
                    <span className="text-sm text-charcoal/40 font-sans font-normal ml-1">/{total}</span>
                )}
                {suffix && <span className="text-sm text-charcoal/40 font-sans font-normal ml-1">{suffix}</span>}
            </p>
            {accentColor === "crimson" && !total && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-crimson"></div>
            )}
        </div>
    );
}
