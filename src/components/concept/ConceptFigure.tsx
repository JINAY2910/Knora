"use client";

import { useState } from "react";

interface ConceptFigureProps {
    figureNumber: string;
    caption: string;
    children: React.ReactNode;
}

export default function ConceptFigure({ figureNumber, caption, children }: ConceptFigureProps) {
    const [isEnlarged, setIsEnlarged] = useState(false);

    return (
        <>
            <figure className="mb-16 border-2 border-charcoal bg-white p-2 shadow-[8px_8px_0px_0px_rgba(55,56,51,1)] relative z-0">
                <div className="aspect-video w-full bg-[#f8f9f7] flex items-center justify-center relative border border-charcoal/10 group overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "radial-gradient(#373833 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>
                    <div className="absolute top-0 left-0 w-full h-full border-[12px] border-white/50 pointer-events-none"></div>
                    {children}
                </div>
                <figcaption className="mt-3 px-2 flex justify-between items-baseline font-mono text-xs text-charcoal">
                    <span>
                        <strong className="text-crimson">{figureNumber}</strong> — {caption}
                    </span>
                    <button
                        onClick={() => setIsEnlarged(true)}
                        className="cursor-pointer hover:text-crimson hover:underline decoration-crimson underline-offset-4 transition-all uppercase tracking-wide font-bold"
                    >
                        Enlarge
                    </button>
                </figcaption>
            </figure>

            {isEnlarged && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-8">
                    <div className="relative w-full max-w-5xl bg-white border-2 border-charcoal shadow-[12px_12px_0px_0px_rgba(250,39,66,1)] flex flex-col animate-in fade-in zoom-in-95 duration-200 p-4">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-sm text-charcoal uppercase font-bold tracking-widest pl-2 pt-2">
                                <strong className="text-crimson">{figureNumber}</strong> — {caption}
                            </span>
                            <button
                                onClick={() => setIsEnlarged(false)}
                                className="h-10 w-10 flex items-center justify-center bg-cream border-2 border-charcoal text-charcoal hover:bg-crimson hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined font-bold">close</span>
                            </button>
                        </div>
                        <div className="w-full bg-[#f8f9f7] flex items-center justify-center relative border-2 border-charcoal overflow-hidden aspect-video">
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: "radial-gradient(#373833 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                }}
                            ></div>
                            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 [&_img]:max-w-full [&_img]:max-h-full [&_img]:object-contain">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
