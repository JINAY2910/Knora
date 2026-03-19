"use client";

import { useState, useEffect } from "react";

interface Goal {
    date: string;
    month: string;
    title: string;
    type: string;
    duration: string;
}

export default function GoalsWidget() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("PRACTICE");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const res = await fetch("/api/user/goals");
            if (res.ok) {
                const data = await res.json();
                if (data.goals) {
                    setGoals(data.goals);
                }
            }
        } catch (error) {
            console.error("Failed to fetch goals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date || !duration) return;

        const dateObj = new Date(date);
        const day = dateObj.getDate().toString();
        const month = dateObj.toLocaleString("en-US", { month: "short" });

        try {
            const res = await fetch("/api/user/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    date: day,
                    month: month,
                    type,
                    duration,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setGoals([...goals, data.goal]);
                setIsAdding(false);
                setTitle("");
                setDate("");
                setDuration("");
            }
        } catch (error) {
            console.error("Failed to add goal", error);
        }
    };

    return (
        <div className="bg-white p-6 border-2 border-charcoal">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wide">
                    Upcoming Goals
                </h3>
            </div>
            
            <div className="space-y-4">
                {loading ? (
                    <p className="text-xs text-charcoal/40 text-center py-4">Loading...</p>
                ) : goals.length === 0 ? (
                    <p className="text-xs text-charcoal/40 text-center py-4">No upcoming goals.</p>
                ) : (
                    goals.map((goal, index) => (
                        <div key={index} className="flex gap-3 items-start cursor-pointer group">
                            <div className="w-12 h-12 bg-cream flex-shrink-0 flex flex-col items-center justify-center border-2 border-charcoal">
                                <span className="text-[8px] text-charcoal/60 uppercase font-bold tracking-widest">
                                    {goal.month}
                                </span>
                                <span className="text-lg font-bold text-crimson leading-none font-serif">
                                    {goal.date}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-charcoal group-hover:text-crimson transition-colors leading-tight">
                                    {goal.title}
                                </h4>
                                <p className="text-[10px] text-charcoal/40 font-mono mt-0.5 uppercase tracking-wide">
                                    {goal.type} • {goal.duration}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isAdding ? (
                <form onSubmit={handleAddGoal} className="mt-5 space-y-3 pt-3 border-t border-gray-100">
                    <input
                        type="text"
                        placeholder="Goal Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-xs p-2 border-2 border-gray-200 uppercase"
                        required
                    />
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-1/2 text-[10px] p-2 border-2 border-gray-200 uppercase"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Duration (e.g. 2 HRS)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-1/2 text-[10px] p-2 border-2 border-gray-200 uppercase"
                            required
                        />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full text-[10px] p-2 border-2 border-gray-200 uppercase bg-white"
                    >
                        <option value="PRACTICE">Practice</option>
                        <option value="MOCK TEST">Mock Test</option>
                        <option value="READING">Reading</option>
                        <option value="VIDEO">Video</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="flex-1 py-2 text-[10px] font-bold text-charcoal/60 uppercase hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 text-[10px] font-bold text-white bg-charcoal uppercase hover:bg-crimson transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="w-full mt-5 py-2.5 border-2 border-dashed border-gray-300 text-[11px] font-bold text-charcoal/40 hover:text-charcoal hover:border-charcoal transition-colors uppercase tracking-wide"
                >
                    + Add Custom Goal
                </button>
            )}
        </div>
    );
}
