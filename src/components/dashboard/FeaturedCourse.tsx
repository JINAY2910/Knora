import Link from "next/link";

interface FeaturedCourseProps {
    title: string;
    description: string;
    href: string;
    progress: number;
}

export default function FeaturedCourse({ title, description, href, progress }: FeaturedCourseProps) {
    if (!title) return null; // If no featured course, don't render anything

    return (
        <section className="mb-12">
            <div className="relative bg-charcoal text-white overflow-hidden">
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
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter font-sans">
                            {title}
                        </h2>
                        <p className="text-gray-300 max-w-xl mb-8 text-base leading-relaxed font-light">
                            {description}
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href={href}>
                                <button className="px-8 py-3 bg-white text-charcoal font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 border border-transparent hover:border-white">
                                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                                    Resume Learning
                                </button>
                            </Link>
                            <span className="text-xs text-gray-400 font-mono">LAST STUDIED: 2H AGO</span>
                        </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="flex-shrink-0 relative w-36 h-36 flex items-center justify-center">
                        <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-30">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" className="text-white" />
                            </svg>
                        </div>

                        <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(220,20,60,0.6)]" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                            <circle cx="50" cy="50" r="34" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="1 3" />
                            <circle
                                cx="50" cy="50" r="40" fill="transparent" stroke="#DC143C" strokeWidth="6"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - (progress / 100))}`}
                                strokeLinecap="round" className="transition-all duration-1000 ease-out"
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold font-mono text-white tracking-tighter">{progress}%</span>
                            <span className="text-[8px] text-crimson font-bold uppercase tracking-widest mt-1 animate-pulse">Running</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
