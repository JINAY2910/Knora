export default function AIInsightWidget() {
    return (
        <div className="bg-charcoal text-white p-6 border-l-4 border-crimson">
            <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-crimson text-xl">auto_awesome</span>
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                        AI Insight
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                        Students who review{" "}
                        <span className="text-white font-semibold">Binary Trees</span>{" "}
                        right after Arrays score 20% higher in logic tests.
                    </p>
                    <button className="text-[10px] font-bold bg-white text-charcoal px-4 py-2 hover:bg-gray-100 transition-colors uppercase tracking-wide w-full text-center">
                        Add to Queue
                    </button>
                </div>
            </div>
        </div>
    );
}
