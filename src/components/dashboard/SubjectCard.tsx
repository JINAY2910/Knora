import Link from "next/link";

interface SubjectCardProps {
    title: string;
    modules: number;
    topics: number;
    progress: number;
    status: "active" | "locked" | "complete";
    icon: string;
    priorityTopics?: Array<{
        title: string;
        type: string;
        duration: string;
        difficulty?: string;
        pyqCount?: number;
        locked?: boolean;
    }>;
    href?: string;
}

export default function SubjectCard({
    title,
    modules,
    topics,
    progress,
    status,
    icon,
    priorityTopics,
    href = "/concept/xor-gate",
}: SubjectCardProps) {
    const getButtonText = () => {
        if (status === "locked") return "START COURSE";
        if (status === "complete") return "REVIEW";
        return "CONTINUE";
    };

    const getProgressColor = () => {
        if (progress >= 75) return "bg-crimson";
        if (progress >= 40) return "bg-crimson";
        return "bg-charcoal";
    };

    const isExpanded = !!priorityTopics;

    if (isExpanded) {
        return (
            <Link href={href}>
                <div className="group relative bg-white border-2 border-charcoal p-0 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 cursor-pointer">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                            <div className="w-12 h-12 border-2 border-charcoal flex items-center justify-center bg-cream">
                                <span className="material-symbols-outlined text-charcoal text-[24px]">{icon}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest mb-1">
                                    Progress
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className={`h-full ${getProgressColor()} rounded-full`} style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-charcoal font-mono">{progress}%</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-charcoal mb-0.5">{title}</h3>
                        <p className="text-[11px] text-charcoal/50">
                            {modules} Modules • {topics} Topics
                        </p>
                    </div>

                    {/* Priority Topics */}
                    <div className="bg-gray-50 p-5 space-y-3.5">
                        <h4 className="text-[9px] font-bold text-charcoal/30 uppercase tracking-widest">
                            Priority Topics
                        </h4>
                        {priorityTopics?.map((topic, index) => (
                            <div key={index} className={`flex items-center justify-between group/item ${topic.locked ? 'opacity-50' : ''}`}>
                                <div className="flex items-center gap-2.5">
                                    <span className={`material-symbols-outlined text-[18px] ${topic.locked ? 'text-charcoal/20' : 'text-charcoal/30'}`}>
                                        {topic.locked ? 'lock' : topic.type === 'video' ? 'play_circle' : 'radio_button_unchecked'}
                                    </span>
                                    <div>
                                        <p className={`text-sm font-semibold ${topic.locked ? 'text-charcoal/40' : 'text-charcoal group-hover/item:text-crimson'} transition-colors`}>
                                            {topic.title}
                                        </p>
                                        <span className="text-[10px] text-gray-400 font-mono uppercase mt-0.5 block">
                                            {topic.duration}
                                        </span>
                                    </div>
                                </div>
                                {topic.pyqCount && (
                                    <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold bg-crimson text-white uppercase tracking-wide">
                                        🔥 {topic.pyqCount} PYQs
                                    </span>
                                )}
                                {topic.difficulty && !topic.pyqCount && (
                                    <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${topic.difficulty === 'MEDIUM' ? 'bg-white text-charcoal border border-charcoal' : 'bg-transparent text-charcoal/40 border border-charcoal/20'}`}>
                                        {topic.difficulty}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 bg-white border-t border-gray-200 text-center">
                        <span className="text-xs font-bold text-crimson hover:text-crimson-dark uppercase tracking-wide inline-flex items-center gap-1 cursor-pointer">
                            View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    // Simple card
    return (
        <Link href={href}>
            <div className={`group bg-white border-2 ${status === 'locked' ? 'border-dashed border-charcoal/30 hover:border-charcoal' : 'border-charcoal'} p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[220px] ${status === 'locked' ? 'opacity-70 hover:opacity-100' : ''}`}>
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 border-2 ${status === 'locked' ? 'border-charcoal/20 bg-gray-50' : 'border-charcoal bg-cream'} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined text-[24px] ${status === 'locked' ? 'text-charcoal/20' : 'text-charcoal'}`}>{icon}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={`text-[9px] font-bold ${status === 'locked' ? 'text-charcoal/30' : 'text-charcoal/40'} uppercase tracking-widest mb-1`}>
                                {status === "locked" ? "Not Started" : "Progress"}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${getProgressColor()} rounded-full`} style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className={`text-xs font-bold ${status === 'locked' ? 'text-charcoal/30' : 'text-charcoal'} font-mono`}>{progress}%</span>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-0.5">{title}</h3>
                    <p className="text-[11px] text-charcoal/50 mb-4">
                        {modules} Modules • {topics} Topics
                    </p>
                </div>
                <button className={`w-full py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${status === 'locked' ? 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white' : 'bg-charcoal text-white hover:bg-crimson'}`}>
                    {getButtonText()}
                </button>
            </div>
        </Link>
    );
}
