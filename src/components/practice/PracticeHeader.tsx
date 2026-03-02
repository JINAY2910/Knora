import Link from "next/link";

interface PracticeHeaderProps {
    subject: string;
    section: string;
    timeRemaining: string;
    difficulty: "Easy" | "Medium" | "Hard" | "Exam Level";
    onSubmit: () => void;
    onAskHint: () => void;
}

export default function PracticeHeader({
    subject,
    section,
    timeRemaining,
    difficulty,
    onSubmit,
    onAskHint,
}: PracticeHeaderProps) {
    const difficultyColors = {
        Easy: "bg-green-600",
        Medium: "bg-yellow-600",
        Hard: "bg-primary",
        "Exam Level": "bg-charcoal",
    };

    return (
        <header className="h-20 flex-none border-b-2 border-charcoal bg-cream px-8 flex items-center justify-between z-20 shadow-sm relative">
            <div className="flex items-center gap-6">
                <Link href="/dashboard/subjects" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title="Back to Dashboard">
                    <img src="/logo.png" alt="KNORA" className="w-9 h-9" />
                    <span className="font-bold text-xl tracking-tight hidden md:block text-charcoal">
                        KNORA
                    </span>
                </Link>
                <div className="h-6 w-px bg-charcoal/20 hidden md:block"></div>
                <nav className="hidden md:flex items-center text-sm font-medium text-charcoal/60">
                    <span className="hover:text-crimson transition-colors cursor-pointer uppercase tracking-widest text-xs font-bold">
                        {subject}
                    </span>
                    <span className="material-symbols-outlined text-base mx-2 text-charcoal/40">
                        chevron_right
                    </span>
                    <span className="text-charcoal font-bold tracking-wide uppercase text-xs">{section}</span>
                </nav>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 bg-white border border-charcoal px-4 py-2 shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]">
                    <span className="material-symbols-outlined text-crimson text-xl">timer</span>
                    <span className="font-mono font-bold text-lg text-charcoal tracking-wider">{timeRemaining}</span>
                </div>
                <div
                    className={`hidden lg:flex items-center px-4 py-2 ${difficultyColors[difficulty]} text-white border border-charcoal text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]`}
                >
                    {difficulty}
                </div>

                <button
                    onClick={onAskHint}
                    className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white hover:bg-black transition-all border border-charcoal font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
                    title="Ask AI Hint"
                >
                    <span className="material-symbols-outlined text-cream text-[18px]">auto_awesome</span>
                    <span className="hidden sm:inline">Ask AI Hint</span>
                </button>

                <button
                    onClick={onSubmit}
                    className="hidden md:block bg-crimson hover:bg-red-700 text-white px-6 py-2 font-bold text-xs uppercase tracking-widest transition-all border border-charcoal shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
                >
                    Submit Test
                </button>

                <div className="h-10 w-10 border border-charcoal bg-crimson flex items-center justify-center text-white font-sans font-bold text-lg shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] ml-2" title="Settings / Profile">
                    JS
                </div>
            </div>
        </header>
    );
}
