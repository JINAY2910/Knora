"use client";

import TaskItem from "./TaskItem";

interface Task {
    id: string;
    title: string;
    description: string;
    badge?: "High Yield" | "Priority";
    timeEstimate: string;
    features?: string[];
    completed: boolean;
    priority: "high" | "normal";
}

interface TaskListProps {
    tasks: Task[];
    onTaskToggle: (id: string) => void;
    onTaskPlay?: (id: string) => void;
}

export default function TaskList({ tasks, onTaskToggle, onTaskPlay }: TaskListProps) {
    return (
        <section>
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/20 pb-2">
                <h2 className="text-2xl font-bold text-charcoal flex items-center gap-3">
                    <span className="material-symbols-outlined text-crimson text-2xl">check_circle_outline</span>
                    Today's Focus
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">
                        Knora AI Generated
                    </span>
                    <button className="text-charcoal hover:text-crimson transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onToggle={onTaskToggle} onPlay={onTaskPlay} />
                ))}
            </div>
        </section>
    );
}
