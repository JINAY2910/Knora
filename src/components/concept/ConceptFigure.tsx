interface ConceptFigureProps {
    figureNumber: string;
    caption: string;
    children: React.ReactNode;
}

export default function ConceptFigure({ figureNumber, caption, children }: ConceptFigureProps) {
    return (
        <figure className="mb-16 border-2 border-charcoal bg-white p-2 shadow-[8px_8px_0px_0px_rgba(55,56,51,1)]">
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
                <span className="cursor-pointer hover:text-crimson hover:underline decoration-crimson underline-offset-4 transition-all uppercase tracking-wide font-bold">
                    Enlarge
                </span>
            </figcaption>
        </figure>
    );
}
