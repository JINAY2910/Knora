interface PracticeHeaderProps {
    subject: string;
    section: string;
    timeRemaining: string;
    difficulty: "Easy" | "Medium" | "Hard";
    onSubmit: () => void;
    onSettings: () => void;
}

export default function PracticeHeader({
    subject,
    section,
    timeRemaining,
    difficulty,
    onSubmit,
    onSettings,
}: PracticeHeaderProps) {
    const difficultyColors = {
        Easy: "bg-green-600",
        Medium: "bg-yellow-600",
        Hard: "bg-primary",
    };

    return (
        <header className="h-16 flex-none border-b-2 border-editorial-charcoal bg-white px-6 flex items-center justify-between z-20 shadow-sm relative">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="KNORA" className="w-8 h-8" />
                    <span className="font-bold text-lg tracking-tight hidden md:block text-editorial-charcoal">
                        KNORA
                    </span>
                </div>
                <div className="h-6 w-px bg-editorial-charcoal/20 hidden md:block"></div>
                <nav className="hidden md:flex items-center text-sm font-medium text-editorial-charcoal/60">
                    <span className="hover:text-primary transition-colors cursor-pointer uppercase tracking-wide text-xs font-bold">
                        {subject}
                    </span>
                    <span className="material-symbols-outlined text-base mx-1 text-editorial-charcoal">
                        chevron_right
                    </span>
                    <span className="text-editorial-charcoal font-bold">{section}</span>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-editorial-cream border border-editorial-charcoal px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] mr-2">
                    <span className="material-symbols-outlined text-primary text-xl">timer</span>
                    <span className="font-mono font-bold text-lg text-editorial-charcoal">{timeRemaining}</span>
                </div>
                <div
                    className={`hidden sm:flex items-center px-3 py-1 ${difficultyColors[difficulty]} text-white border border-editorial-charcoal text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]`}
                >
                    {difficulty}
                </div>
                <button
                    onClick={onSettings}
                    className="p-2 hover:bg-editorial-charcoal hover:text-white text-editorial-charcoal transition-colors border border-transparent hover:border-editorial-charcoal"
                    title="Settings"
                >
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <button
                    onClick={onSubmit}
                    className="bg-editorial-charcoal hover:bg-black text-white px-5 py-2 font-bold text-sm transition-all border border-editorial-charcoal hover:shadow-lg"
                >
                    Submit Test
                </button>
            </div>
        </header>
    );
}
