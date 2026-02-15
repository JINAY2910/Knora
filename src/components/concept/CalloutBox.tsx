interface CalloutBoxProps {
    type: "concept" | "mistake" | "exam";
    title?: string;
    children: React.ReactNode;
}

export default function CalloutBox({ type, title, children }: CalloutBoxProps) {
    if (type === "concept") {
        return (
            <div className="my-10 flex gap-6 p-6 border-l-4 border-crimson bg-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="material-symbols-outlined text-8xl text-charcoal">lightbulb</span>
                </div>
                <div className="shrink-0 pt-1">
                    <span className="material-symbols-outlined text-crimson text-3xl">auto_awesome</span>
                </div>
                <div className="relative z-10">
                    <h4 className="text-charcoal font-sans font-bold text-lg mb-2 border-b border-gray-200 pb-2 inline-block">
                        {title || "Key Concept"}
                    </h4>
                    <div className="text-lg text-charcoal m-0 leading-relaxed font-normal">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    if (type === "mistake") {
        return (
            <div className="my-10 p-6 border-2 border-crimson bg-white shadow-[6px_6px_0px_0px_rgba(250,39,66,0.2)] relative">
                <div className="flex gap-5 items-start">
                    <div className="shrink-0 bg-crimson text-white p-2 flex items-center justify-center border border-charcoal">
                        <span className="material-symbols-outlined">priority_high</span>
                    </div>
                    <div>
                        <h4 className="text-crimson font-bold text-sm uppercase tracking-widest mb-2">
                            {title || "Common Mistake"}
                        </h4>
                        <div className="text-lg text-charcoal m-0 font-sans">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // type === "exam"
    return (
        <div className="my-10 p-8 bg-charcoal text-cream relative overflow-hidden border-2 border-charcoal shadow-[8px_8px_0px_0px_rgba(250,39,66,1)]">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-9xl text-white">school</span>
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
