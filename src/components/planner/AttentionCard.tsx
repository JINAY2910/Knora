"use client";

interface AttentionTopic {
    name: string;
    logicScore: number;
    severity: "critical" | "warning" | "caution";
}

interface AttentionCardProps {
    topics: AttentionTopic[];
    onTopicClick?: (topic: AttentionTopic) => void;
}

export default function AttentionCard({ topics, onTopicClick }: AttentionCardProps) {
    const severityBorderColors = {
        critical: "border-crimson",
        warning: "border-yellow-500",
        caution: "border-orange-500",
    };

    const severityDotColors = {
        critical: "bg-crimson",
        warning: "bg-yellow-500",
        caution: "bg-orange-500",
    };

    return (
        <div className="bg-charcoal text-white p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Attention Needed</h3>
                <span className="material-symbols-outlined text-crimson text-sm">error_outline</span>
            </div>
            <div className="space-y-4">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        onClick={() => onTopicClick?.(topic)}
                        className={`flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group border-l-2 ${severityBorderColors[topic.severity]}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${severityDotColors[topic.severity]}`}></div>
                            <div>
                                <p className="text-sm font-bold text-white font-serif tracking-wide group-hover:text-stone transition-colors">
                                    {topic.name}
                                </p>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
                                    Logic Score: {topic.logicScore}%
                                </p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-white/40 text-sm group-hover:text-white transition-colors">
                            chevron_right
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
