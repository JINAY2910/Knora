interface QuickQuizCardProps {
    onStartQuiz: () => void;
}

export default function QuickQuizCard({ onStartQuiz }: QuickQuizCardProps) {
    return (
        <div className="bg-white border-2 border-crimson p-8 relative overflow-hidden shadow-lg group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-crimson/10 rounded-full blur-xl group-hover:bg-crimson/20 transition-colors"></div>
            <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Quick Fire Quiz</h3>
            <p className="text-sm text-charcoal/70 mb-6 font-light">
                5 minutes. 10 logic questions. Boost your retention.
            </p>
            <button
                onClick={onStartQuiz}
                className="w-full py-4 bg-crimson hover:bg-crimson-dark text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group shadow-md"
            >
                Start Quiz
                <span className="material-symbols-outlined text-white text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                </span>
            </button>
        </div>
    );
}
