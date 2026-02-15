import Link from "next/link";

export default function AIExaminer() {
    return (
        <section className="py-24 relative bg-[#e8eae3]" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border-2 border-background-dark overflow-hidden shadow-[8px_8px_0px_0px_rgba(55,56,51,1)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="p-10 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-background-dark/10">
                            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 bg-background-dark text-white text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="material-icons-round text-sm text-primary">smart_toy</span>
                                AI Examiner
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-main mb-6">
                                Meet Your Personal <br /> AI Examiner
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 font-sans leading-relaxed">
                                Available 24/7 to grade your logic, explain complex proofs, and predict your
                                exam readiness with 94% accuracy. It's like having a professor in your pocket.
                            </p>
                            <Link
                                href="#"
                                className="text-primary font-bold font-serif flex items-center gap-2 transition-colors group hover:underline underline-offset-4"
                            >
                                Explore AI Capabilities
                                <span className="material-icons-round group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>

                        {/* Right Chat Interface */}
                        <div className="relative bg-background-light min-h-[400px] flex items-center justify-center overflow-hidden">
                            {/* Background Pattern */}
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: "radial-gradient(#373833 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            ></div>

                            {/* Chat Demo */}
                            <div className="w-[85%] max-w-md bg-white border-2 border-background-dark shadow-[4px_4px_0px_0px_rgba(55,56,51,0.5)] p-4 flex flex-col gap-4 relative z-10 translate-y-8 lg:translate-y-0">
                                {/* User Message 1 */}
                                <div className="flex gap-3 justify-end">
                                    <div className="bg-background-light text-text-main text-sm p-3 border border-background-dark/20 max-w-[80%]">
                                        Why is the answer B and not C in the logic sequence?
                                    </div>
                                    <div className="w-8 h-8 bg-background-dark flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                                        You
                                    </div>
                                </div>

                                {/* AI Response 1 */}
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-primary flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                                        AI
                                    </div>
                                    <div className="bg-text-main text-white text-sm p-3 max-w-[90%] shadow-lg">
                                        <p className="mb-2">
                                            Great question. While C fits the pattern of shapes, it violates the rule
                                            of alternating colors established in step 2.
                                        </p>
                                        <p className="text-primary font-bold text-xs border-t border-white/20 mt-2 pt-2 uppercase tracking-wide">
                                            Logic Rule #4: Color Alternation Priority
                                        </p>
                                    </div>
                                </div>

                                {/* User Message 2 (Dimmed) */}
                                <div className="flex gap-3 justify-end opacity-60">
                                    <div className="bg-background-light text-text-main text-sm p-3 border border-background-dark/20 max-w-[80%]">
                                        Ah, I missed the color rule. Explain that rule again?
                                    </div>
                                    <div className="w-8 h-8 bg-background-dark flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                                        You
                                    </div>
                                </div>

                                {/* AI Typing Indicator */}
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-primary flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                                        AI
                                    </div>
                                    <div className="bg-white border border-background-dark text-text-main text-sm p-3 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-primary animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-primary animate-bounce delay-200"></span>
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
