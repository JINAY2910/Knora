"use client";

interface AssessmentFooterProps {
    onDownload: () => void;
    onShare: () => void;
    onRetake: () => void;
    onNextModule: () => void;
}

export default function AssessmentFooter({ onDownload, onShare, onRetake, onNextModule }: AssessmentFooterProps) {
    return (
        <footer className="sticky bottom-0 bg-cream border-t-2 border-charcoal py-5 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-charcoal">
                    <button
                        onClick={onDownload}
                        className="hover:text-crimson flex items-center gap-2 transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">download</span> Download PDF
                    </button>
                    <span className="h-4 w-px bg-charcoal/30"></span>
                    <button onClick={onShare} className="hover:text-crimson flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-base">share</span> Share Results
                    </button>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                        onClick={onRetake}
                        className="flex-1 sm:flex-none px-6 py-3 border-2 border-charcoal text-charcoal font-bold uppercase tracking-widest hover:bg-charcoal hover:text-cream transition-colors text-xs"
                    >
                        Retake Exam
                    </button>
                    <button
                        onClick={onNextModule}
                        className="flex-1 sm:flex-none px-6 py-3 bg-crimson border-2 border-crimson text-white font-bold uppercase tracking-widest shadow-sharp hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 text-xs"
                    >
                        Next Module
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
