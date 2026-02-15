export default function Comparison() {
    return (
        <section className="py-24 bg-background-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Left Content */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-background-light mb-6">
                            Stop Memorizing.
                            <br />
                            Start Understanding.
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed font-sans font-light">
                            Traditional platforms focus on "what" to answer. KNORA focuses on "how" to
                            think. We are shifting the paradigm from rote retention to logical application.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary text-white border border-white/10">
                                    <span className="material-icons-round">hub</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif font-bold mb-1">
                                        Deep Concept Mapping
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Visualize connections between topics instead of isolated facts.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary text-white border border-white/10">
                                    <span className="material-icons-round">insights</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif font-bold mb-1">Predictive Scoring</h4>
                                    <p className="text-gray-400 text-sm">
                                        Know your exam score weeks before you sit for the test.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary text-white border border-white/10">
                                    <span className="material-icons-round">speed</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif font-bold mb-1">Real-time Feedback</h4>
                                    <p className="text-gray-400 text-sm">
                                        Instant correction on logic errors, not just final answers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Comparison Table */}
                    <div className="md:w-1/2 w-full">
                        <div className="bg-[#2d2e2a] border border-white/10 p-8 shadow-2xl relative">
                            <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-6 mb-6">
                                {/* Traditional Column */}
                                <div className="opacity-60">
                                    <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                                        Traditional
                                    </h3>
                                    <ul className="space-y-4 text-sm text-gray-400 font-serif">
                                        <li className="flex items-center gap-2">
                                            <span className="material-icons-round text-red-400 text-base">close</span>
                                            Static Question Banks
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="material-icons-round text-red-400 text-base">close</span>
                                            Generic Explanations
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="material-icons-round text-red-400 text-base">close</span>
                                            Memory focused
                                        </li>
                                    </ul>
                                </div>

                                {/* KNORA Column */}
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-4">
                                        KNORA Logic
                                    </h3>
                                    <ul className="space-y-4 text-sm text-white font-serif font-medium">
                                        <li className="flex items-center gap-2">
                                            <span className="material-icons-round text-primary text-base">check</span>
                                            Dynamic Generation
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="material-icons-round text-primary text-base">check</span>
                                            Context-Aware AI
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="material-icons-round text-primary text-base">check</span>
                                            Reasoning focused
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Stats Footer */}
                            <div className="bg-background-dark border border-white/10 p-4 flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                                        Average Improvement
                                    </div>
                                    <div className="text-xl font-serif font-bold text-white">3.5x Faster</div>
                                </div>
                                <div className="h-10 w-px bg-white/10"></div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                                        Student Rating
                                    </div>
                                    <div className="flex text-primary text-sm">
                                        <span className="material-icons-round text-base">star</span>
                                        <span className="material-icons-round text-base">star</span>
                                        <span className="material-icons-round text-base">star</span>
                                        <span className="material-icons-round text-base">star</span>
                                        <span className="material-icons-round text-base">star</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
