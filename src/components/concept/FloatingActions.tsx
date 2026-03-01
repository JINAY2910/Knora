"use client";

import { useState, useEffect } from "react";

export default function FloatingActions() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [notes, setNotes] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedNotes = localStorage.getItem(`notes_${window.location.pathname}`);
        if (savedNotes) {
            setNotes(savedNotes);
        }

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    if (!isMounted) return null;

    return (
        <>
            <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-50">
                <button
                    onClick={toggleFullscreen}
                    className="h-12 w-12 bg-white text-charcoal border-2 border-charcoal hover:bg-crimson hover:text-white hover:border-crimson shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] flex items-center justify-center transition-all"
                    title={isFullscreen ? "Exit Focus Mode" : "Toggle Focus Mode"}
                >
                    <span className="material-symbols-outlined">
                        {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                    </span>
                </button>
                <button
                    onClick={() => setIsNotesOpen(true)}
                    className="h-14 w-14 bg-charcoal text-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(250,39,66,1)] flex items-center justify-center transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(250,39,66,1)]"
                    title="Take Notes"
                >
                    <span className="material-symbols-outlined">edit_note</span>
                </button>
            </div>

            {/* Notes Modal */}
            {isNotesOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/50 backdrop-blur-sm p-4">
                    <div className="bg-cream w-full max-w-lg border-2 border-charcoal shadow-[8px_8px_0px_0px_rgba(250,39,66,1)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-4 border-b-2 border-charcoal bg-white">
                            <h3 className="font-sans font-bold text-xl text-charcoal flex items-center gap-2">
                                <span className="material-symbols-outlined text-crimson">edit_note</span>
                                Concept Notes
                            </h3>
                            <button
                                onClick={() => setIsNotesOpen(false)}
                                className="text-charcoal-light hover:text-crimson transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-4 flex-1">
                            <textarea
                                value={notes}
                                onChange={(e) => {
                                    setNotes(e.target.value);
                                    localStorage.setItem(`notes_${window.location.pathname}`, e.target.value);
                                }}
                                placeholder="Jot down your thoughts, important concepts, or questions here. These notes are saved locally for this specific page..."
                                className="w-full h-64 p-4 border-2 border-charcoal/20 bg-white resize-none focus:outline-none focus:border-crimson text-charcoal font-sans"
                            />
                        </div>
                        <div className="p-4 border-t-2 border-charcoal bg-white flex justify-end">
                            <button
                                onClick={() => setIsNotesOpen(false)}
                                className="px-6 py-2 bg-charcoal text-white font-bold text-sm uppercase tracking-wider hover:bg-crimson transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
