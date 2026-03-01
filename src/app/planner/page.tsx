"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import ExamCountdown from "@/components/planner/ExamCountdown";
import TaskList from "@/components/planner/TaskList";
import CircularProgress from "@/components/planner/CircularProgress";
import AttentionCard from "@/components/planner/AttentionCard";
import QuickQuizCard from "@/components/planner/QuickQuizCard";

// Mock data
const initialTasks = [
    {
        id: "1",
        title: "Review: OOP Principles in Java",
        description: "Focus on polymorphism and abstract classes.",
        badge: "High Yield" as const,
        timeEstimate: "45m",
        features: ["Logic Drill included"],
        completed: false,
        priority: "high" as const,
    },
    {
        id: "2",
        title: "Practice: Multithreading in Java",
        description: "Complete set B of the advanced concurrency bank.",
        timeEstimate: "30m",
        completed: false,
        priority: "normal" as const,
    },
    {
        id: "3",
        title: "Flashcards: C++ STL Containers",
        description: "Review key vectors, maps, and sets.",
        timeEstimate: "15m",
        completed: false,
        priority: "normal" as const,
    },
];

const attentionTopics = [
    { name: "Java Memory Model", logicScore: 45, severity: "critical" as const },
    { name: "C++ Smart Pointers", logicScore: 58, severity: "warning" as const },
    { name: "Move Semantics", logicScore: 62, severity: "caution" as const },
];

export default function PlannerPage() {
    const [tasks, setTasks] = useState(initialTasks);

    const handleTaskToggle = (id: string) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const handleTaskPlay = (id: string) => {
        window.location.href = "/practice/logic-syllogisms-hard";
    };

    const handleStartSession = () => {
        window.location.href = "/practice/logic-syllogisms-hard";
    };

    const handleStartQuiz = () => {
        window.location.href = "/practice/logic-syllogisms-hard";
    };

    const handleTopicClick = (topic: any) => {
        window.location.href = `/concept/xor-gate`;
    };

    return (
        <div className="bg-cream text-charcoal font-sans min-h-screen flex overflow-hidden selection:bg-crimson selection:text-white">
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-5 bg-white border-b border-charcoal/10">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="KNORA" className="w-8 h-8" />
                        <span className="font-serif font-bold text-lg text-charcoal">KNORA</span>
                    </Link>
                    <button className="text-charcoal">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-10">
                            <div className="border-b border-charcoal pb-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                                    Good Evening, Alex.
                                </h1>
                                <p className="text-charcoal/70 text-lg font-light">
                                    Here is your optimized revision plan for today.
                                </p>
                            </div>

                            <ExamCountdown
                                examName="Java & C++ Mastery"
                                daysRemaining={12}
                                hoursRemaining={4}
                                readinessScore={72}
                                progress={65}
                                onStartSession={handleStartSession}
                            />

                            <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} onTaskPlay={handleTaskPlay} />

                            {/* Tomorrow Section */}
                            <section className="pt-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-serif font-bold text-charcoal">Tomorrow</h2>
                                </div>
                                <div className="flex items-center gap-6 p-6 bg-transparent border border-dashed border-charcoal/30">
                                    <div className="w-12 h-12 bg-stone/30 flex items-center justify-center text-charcoal/50">
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-charcoal">Plan unlocks in 12 hours</h3>
                                        <p className="text-sm text-charcoal/60 italic font-serif">
                                            Knora AI is analyzing your progress to build tomorrow's schedule.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Widgets */}
                        <div className="lg:col-span-4 space-y-8">
                            <CircularProgress
                                percentage={68}
                                label="Syllabus Completion"
                                stats={{ mastered: 42, total: 65, pending: 23 }}
                            />

                            <AttentionCard topics={attentionTopics} onTopicClick={handleTopicClick} />

                            <QuickQuizCard onStartQuiz={handleStartQuiz} />

                            <div className="p-6 bg-stone/20 border-l-2 border-charcoal/20">
                                <p className="text-sm text-charcoal/60 font-serif italic leading-relaxed">
                                    "Consistency is the hallmark of the unimaginable."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="h-20"></div>
                </div>
            </main>

            {/* Mobile FAB */}
            <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-crimson text-white shadow-lg flex items-center justify-center z-50">
                <span className="material-symbols-outlined">add</span>
            </button>
        </div>
    );
}
