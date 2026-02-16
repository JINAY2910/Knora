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
        if (status === "locked" || progress === 0) return "START COURSE";
        if (status === "complete") return "REVISE";
        return "CONTINUE";
    };

    const BUTTON_TEXT = getButtonText();

    const getProgressColor = () => {
        if (progress >= 75) return "bg-green-500";
        if (progress >= 40) return "bg-crimson";
        return "bg-charcoal";
    };

    return (
        <Link href={href} className="block h-full">
            <div className={`group relative h-full bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-4px] translate-y-[-4px] hover:translate-x-0 hover:translate-y-0 hover:shadow-none transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[420px]`}>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Header: Icon + Progress */}
                    <div className="p-6 pb-2 flex justify-between items-start">
                        {/* Icon Box */}
                        <div className={`w-12 h-12 border-2 border-charcoal flex items-center justify-center ${status === 'locked' ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-cream text-charcoal'}`}>
                            <span className="material-symbols-outlined text-[24px]">{icon}</span>
                        </div>

                        {/* Progress Section */}
                        {status !== "locked" || progress > 0 ? (
                            <div className="flex flex-col items-end w-32">
                                <div className="flex justify-between w-full items-end mb-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        Progress
                                    </span>
                                    <span className="text-xs font-bold text-charcoal font-mono">{progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 relative">
                                    <div
                                        className={`absolute top-0 left-0 h-full ${getProgressColor()}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-end w-32 opacity-50">
                                <div className="flex justify-between w-full items-end mb-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        Progress
                                    </span>
                                    <span className="text-xs font-bold text-charcoal font-mono">0%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 relative"></div>
                            </div>
                        )}
                    </div>

                    {/* Title Section */}
                    <div className="px-6 mb-6">
                        <h3 className="text-2xl font-bold text-charcoal mb-1 leading-none tracking-tight">{title}</h3>
                        <p className="text-xs text-gray-400 font-medium">
                            {modules} Modules • {topics} Topics
                        </p>
                    </div>

                    {/* Priority Topics List */}
                    <div className="flex-1 bg-gray-50 p-6 pt-5 border-t border-gray-100 flex flex-col gap-4">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Priority Topics
                        </h4>

                        {priorityTopics ? (
                            <div className="space-y-4">
                                {priorityTopics.slice(0, 3).map((topic, index) => (
                                    <div key={index} className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className={`material-symbols-outlined text-[20px] shrink-0 ${topic.locked ? 'text-gray-300' : 'text-gray-400'}`}>
                                                {topic.locked ? 'lock' : topic.type === 'video' ? 'play_circle' : 'radio_button_unchecked'}
                                            </span>
                                            <div className="flex flex-col">
                                                <p className={`text-sm font-bold leading-tight ${topic.locked ? 'text-gray-400' : 'text-charcoal group-hover/item:text-crimson transition-colors'}`}>
                                                    {topic.title}
                                                </p>
                                                <span className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase tracking-wide">
                                                    {topic.duration}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tags - Only Difficulty */}
                                        {topic.difficulty && (
                                            <span className="shrink-0 px-2 py-0.5 bg-white border border-charcoal text-charcoal text-[10px] font-bold uppercase tracking-wide ml-2">
                                                {topic.difficulty}
                                            </span>
                                        )}
                                    </div>
                                ))}
                                {priorityTopics.length > 3 && (
                                    <p className="text-[10px] text-gray-400 font-medium text-center pt-2">
                                        +{priorityTopics.length - 3} more topics
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center min-h-[100px]">
                                <p className="text-xs text-gray-300 italic">No priority topics available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="w-full bg-white border-t-2 border-gray-100 py-4 text-center group-hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-bold text-crimson uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        {BUTTON_TEXT} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
