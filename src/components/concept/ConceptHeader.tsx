"use client";

import { useState } from "react";
import Link from "next/link";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <header className="h-20 border-b-2 border-charcoal bg-cream z-20 flex items-center justify-between px-8 shrink-0 relative">
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-charcoal hover:text-crimson transition-colors md:hidden"
                >
                    <span className="material-symbols-outlined text-[24px]">
                        {isMobileMenuOpen ? "close" : "menu"}
                    </span>
                </button>
                <div className="flex items-center gap-3 text-sm tracking-wide">
                    <Link href="/dashboard/subjects" className="text-charcoal-light hover:text-crimson transition-colors uppercase font-bold text-xs tracking-widest hidden sm:inline">
                        {subject}
                    </Link>
                    <span className="text-charcoal-light font-sans text-xs hidden sm:inline">/</span>
                    <span className="text-charcoal-light uppercase font-bold text-xs tracking-widest hidden sm:inline">
                        {topic}
                    </span>
                    <span className="text-charcoal-light font-sans text-xs hidden sm:inline">/</span>
                    <span className="font-bold text-charcoal font-sans text-lg truncate max-w-[200px] sm:max-w-none">{conceptTitle}</span>
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

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-cream border-b-2 border-charcoal shadow-lg md:hidden z-50 animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col p-4">
                        <Link
                            href="/dashboard/subjects"
                            className="px-4 py-3 text-charcoal border-b border-charcoal/10 font-bold uppercase tracking-widest text-sm hover:text-crimson transition-colors flex items-center gap-3"
                        >
                            <span className="material-symbols-outlined">grid_view</span>
                            Dashboard
                        </Link>
                        <Link
                            href="/planner"
                            className="px-4 py-3 text-charcoal border-b border-charcoal/10 font-bold uppercase tracking-widest text-sm hover:text-crimson transition-colors flex items-center gap-3"
                        >
                            <span className="material-symbols-outlined">calendar_today</span>
                            Revision Planner
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
