export default function FeaturedCourse() {
    return (
        <section className="mb-12">
            <div className="relative bg-charcoal text-white shadow-card overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center grayscale mix-blend-overlay"></div>

                <div className="relative z-10 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-crimson text-white">
                                Priority
                            </span>
                            <span className="text-xs font-medium text-gray-300">Exam in 5 days</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight font-serif">
                            Data Structures & Algorithms
                        </h2>
                        <p className="text-gray-300 max-w-xl mb-8 text-sm leading-relaxed font-light">
                            Master the fundamental building blocks of software. Focus heavily on Graphs and
                            Dynamic Programming based on recent PYQ trends.
                        </p>
                        <div className="flex items-center gap-6">
                            <button className="px-8 py-3 bg-white text-charcoal font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 border border-transparent hover:border-white">
                                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                                Resume Learning
                            </button>
                            <span className="text-xs text-gray-400 font-mono">LAST STUDIED: 2H AGO</span>
                        </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full progress-circle">
                            <circle
                                className="text-gray-700"
                                cx="64"
                                cy="64"
                                fill="transparent"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <circle
                                className="text-crimson"
                                cx="64"
                                cy="64"
                                fill="transparent"
                                r="58"
                                stroke="currentColor"
                                strokeDasharray="364"
                                strokeDashoffset="120"
                                strokeLinecap="round"
                                strokeWidth="4"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">67%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
