export default function Method() {
    return (
        <section className="py-24 relative bg-[#e8eae3]" id="method">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-main mb-6">
                        The KNORA Method
                    </h2>
                    <p className="text-gray-600 text-lg font-serif italic">
                        A structured workflow designed to build foundational understanding before
                        testing application.
                    </p>
                </div>

                {/* Method Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-background-dark/20 border-t border-dashed border-background-dark/30 z-0"></div>

                    {/* Card 1: Learn */}
                    <div className="relative group">
                        <div className="bg-white border-2 border-background-dark p-8 h-full card-hover relative z-10">
                            <div className="w-14 h-14 bg-background-dark text-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                                <span className="material-icons-round text-3xl">school</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-text-main mb-3">01. Learn</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Deconstruct complex theories into digestible logic blocks. Our AI identifies
                                your baseline and builds a custom curriculum map.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Practice */}
                    <div className="relative group">
                        <div className="bg-white border-2 border-background-dark p-8 h-full card-hover relative z-10">
                            <div className="w-14 h-14 bg-background-dark text-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                                <span className="material-icons-round text-3xl">psychology_alt</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-text-main mb-3">
                                02. Practice
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Engage with adaptive quizzes that evolve with your performance. The difficulty
                                scales automatically as you master concepts.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Revision */}
                    <div className="relative group">
                        <div className="bg-white border-2 border-background-dark p-8 h-full card-hover relative z-10">
                            <div className="w-14 h-14 bg-background-dark text-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                                <span className="material-icons-round text-3xl">sync_problem</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-text-main mb-3">
                                03. Revision
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Smart spaced repetition ensures retention. The AI predicts what you're about
                                to forget and schedules targeted reviews.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
