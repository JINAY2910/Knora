interface ConceptHeaderProps {
    subject: string;
    topic: string;
    conceptTitle: string;
    userInitials: string;
    examMode?: boolean;
}

export default function ConceptHeader({
    subject,
    topic,
    conceptTitle,
    userInitials,
    examMode = false,
}: ConceptHeaderProps) {
    return (
        <header className="h-20 border-b-2 border-charcoal bg-cream z-20 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-6">
                <button className="p-2 text-charcoal hover:text-crimson transition-colors">
                    <span className="material-symbols-outlined text-[24px]">menu</span>
                </button>
                <div className="flex items-center gap-3 text-sm tracking-wide">
                    <span className="text-charcoal-light uppercase font-bold text-xs tracking-widest">{subject}</span>
                    <span className="text-charcoal-light font-sans text-xs">/</span>
                    <span className="text-charcoal-light uppercase font-bold text-xs tracking-widest">{topic}</span>
                    <span className="text-charcoal-light font-sans text-xs">/</span>
                    <span className="font-bold text-charcoal font-sans text-lg">{conceptTitle}</span>
                </div>
            </div>
            <div className="flex items-center gap-6">
                {examMode && (
                    <div className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-charcoal text-xs font-bold uppercase tracking-wider text-charcoal bg-white shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]">
                        <span className="material-symbols-outlined text-[14px]">school</span>
                        <span>Exam Mode</span>
                    </div>
                )}
                <div className="h-10 w-10 border border-charcoal bg-crimson flex items-center justify-center text-white font-sans font-bold text-lg shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]">
                    {userInitials}
                </div>
            </div>
        </header>
    );
}
