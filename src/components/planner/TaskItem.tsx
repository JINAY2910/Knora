"use client";

interface TaskItemProps {
    task: {
        id: string;
        title: string;
        description: string;
        badge?: "High Yield" | "Priority";
        timeEstimate: string;
        features?: string[];
        completed: boolean;
        priority: "high" | "normal";
    };
    onToggle: (id: string) => void;
    onPlay?: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onPlay }: TaskItemProps) {
    const isPriority = task.priority === "high";

    return (
        <div
            className={`group relative flex items-start gap-6 p-6 bg-white ${isPriority
                    ? "border-l-4 border-crimson shadow-sm"
                    : "border border-charcoal/10"
                } hover:shadow-md transition-all duration-300`}
        >
            <div className="pt-1">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className={`custom-checkbox w-6 h-6 border-2 ${isPriority ? "border-charcoal" : "border-charcoal/30"
                        } rounded-none text-crimson focus:ring-0 cursor-pointer transition-colors`}
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center flex-wrap gap-3 mb-2">
                    <h3 className="text-xl font-serif font-bold text-charcoal group-hover:text-crimson transition-colors">
                        {task.title}
                    </h3>
                    {task.badge && (
                        <span className="px-2 py-1 text-[10px] font-bold bg-charcoal text-white uppercase tracking-widest">
                            {task.badge}
                        </span>
                    )}
                </div>
                <p className="text-charcoal/70 mb-4 font-light leading-relaxed">{task.description}</p>
                <div className="flex items-center gap-6 text-xs font-bold text-charcoal/50 uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span> {task.timeEstimate}{" "}
                        estimated
                    </span>
                    {task.features?.map((feature, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">psychology</span> {feature}
                        </span>
                    ))}
                </div>
            </div>
            {onPlay && (
                <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onPlay(task.id)}
                        className="w-10 h-10 flex items-center justify-center bg-charcoal text-white hover:bg-crimson transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                    </button>
                </div>
            )}
        </div>
    );
}
