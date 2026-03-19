"use client";

import { useState, useEffect } from "react";
import AITutorChatbot from "./AITutorChatbot";

interface Section {
    id: string;
    title: string;
    href: string;
}

interface ConceptSidebarProps {
    sections: Section[];
    activeSection?: string;
}

export default function ConceptSidebar({ sections, activeSection }: ConceptSidebarProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    if (isFullscreen) return null;

    return (
        <aside className="w-72 border-r-2 border-charcoal flex flex-col bg-paper hidden lg:flex">
            <div className="p-8 pb-4 flex-shrink-0">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-[0.2em] mb-4 border-b border-charcoal pb-2">
                    Contents
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                <nav className="space-y-3">
                    {sections.map((section, index) => (
                        <a
                            key={section.id}
                            href={section.href}
                            className={
                                section.id === activeSection
                                    ? "block px-4 py-3 bg-white border border-charcoal shadow-[3px_3px_0px_0px_rgba(250,39,66,1)] text-charcoal font-bold text-sm"
                                    : "block px-4 py-2 text-charcoal-light hover:text-crimson hover:translate-x-1 text-sm font-medium transition-transform duration-200"
                            }
                        >
                            {section.title}
                        </a>
                    ))}
                </nav>
            </div>

            {/* AI Tutor Widget */}
            <div className="mt-auto p-8 border-t-2 border-charcoal bg-cream">
                <div className="bg-charcoal p-5 text-cream shadow-[4px_4px_0px_0px_rgba(250,39,66,1)] relative">
                    <div className="absolute top-4 right-4 w-12 h-12 bg-crimson rounded-full opacity-20 pointer-events-none"></div>
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                        <span className="material-symbols-outlined text-crimson text-sm">auto_awesome</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-white">AI Tutor</span>
                    </div>
                    <p className="text-sm text-gray-300 font-sans mb-4 leading-snug">
                        Need a simpler explanation? Ask the AI.
                    </p>
                    <button 
                        onClick={() => setIsChatOpen(true)}
                        className="w-full py-2 bg-cream text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors border border-transparent hover:border-crimson shadow-[2px_2px_0px_0px_rgba(250,39,66,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        Ask Question
                    </button>
                </div>
            </div>

            {/* Render Chatbot Modally */}
            <AITutorChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </aside>
    );
}
