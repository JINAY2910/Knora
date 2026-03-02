interface QuestionPanelProps {
    questionNumber: number;
    topic: string;
    question: string;
    context?: string;
    figure?: {
        src: string;
        alt: string;
        caption: string;
    };
    tags: string[];
}

export default function QuestionPanel({
    questionNumber,
    topic,
    question,
    context,
    figure,
    tags,
}: QuestionPanelProps) {
    return (
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-crimson text-white px-3 py-1.5 text-sm font-bold uppercase tracking-widest shadow-sm">
                        Question {questionNumber}
                    </span>
                </div>

                <h2 className="text-2xl font-bold text-editorial-charcoal mb-6 leading-tight font-display">
                    {question}
                </h2>

                {context && (
                    <div className="bg-white border-l-4 border-primary p-8 mb-8 shadow-sm">
                        <p className="font-display font-normal text-base leading-relaxed text-editorial-charcoal">
                            {context}
                        </p>
                    </div>
                )}

                {context && (
                    <div className="space-y-4 mb-8">
                        <h3 className="text-sm font-black text-editorial-charcoal uppercase tracking-wider mb-2 border-b-2 border-editorial-charcoal/10 pb-1 inline-block">
                            Contextual Notes
                        </h3>
                        <p className="text-editorial-charcoal/80 leading-relaxed font-medium">
                            Consider the relationship between the proponent's personal characteristics and the merit of
                            their argument. Does the financial status of the proponent have a direct causal link to the
                            validity of the budget proposal?
                        </p>
                    </div>
                )}

                {figure && (
                    <div className="relative w-full h-48 overflow-hidden mb-6 bg-white border border-editorial-charcoal/20 flex items-center justify-center group">
                        <img
                            alt={figure.alt}
                            src={figure.src}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="relative z-10 px-4 py-2 bg-editorial-charcoal text-xs text-white border border-white/20 font-bold tracking-wide shadow-md">
                            {figure.caption}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
