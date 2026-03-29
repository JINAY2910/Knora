"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

interface WeakTopic {
    topic: string;
    percentage: number;
    priority: "high" | "medium" | "low";
}

interface RecentTest {
    id: string;
    testName: string;
    subject: string;
    percentage: number;
    grade: string;
    submittedAt: string;
}

interface OverallStats {
    totalTests: number;
    averageScore: number;
    bestScore: number;
}

interface PlannerData {
    weakTopics: WeakTopic[];
    strongTopics: { topic: string; percentage: number }[];
    recentTests: RecentTest[];
    overallStats: OverallStats | null;
}

const priorityConfig = {
    high: { border: "border-l-crimson border-l-4 bg-red-50", badge: "bg-crimson text-white", label: "High Priority" },
    medium: { border: "border-l-yellow-400 border-l-4 bg-yellow-50", badge: "bg-yellow-500 text-white", label: "Medium" },
    low: { border: "border-l-blue-400 border-l-4 bg-blue-50", badge: "bg-blue-500 text-white", label: "Low" },
};

const gradeColor: Record<string, string> = {
    "A+": "text-green-600", A: "text-green-500", B: "text-blue-500",
    C: "text-yellow-600", D: "text-orange-500", F: "text-red-600",
};

export default function PlannerPage() {
    const [data, setData] = useState<PlannerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/user/planner")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const hasData = data && (data.weakTopics.length > 0 || data.recentTests.length > 0);

    return (
        <div className="bg-cream text-charcoal font-sans min-h-screen flex overflow-hidden selection:bg-crimson selection:text-white">
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
                <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-10">

                        {/* ── Header ─────────────────────────────────────── */}
                        <div className="border-b-2 border-charcoal pb-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50 font-bold mb-1">Personalized</p>
                                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal">Revision Planner</h1>
                                    <p className="text-charcoal/60 mt-2">Auto-generated from your test performance across all subjects.</p>
                                </div>
                                <Link
                                    href="/practice"
                                    className="mt-2 flex items-center gap-2 px-5 py-3 bg-crimson text-white text-xs font-black uppercase tracking-widest border-2 border-crimson hover:bg-charcoal hover:border-charcoal transition-all shadow-[2px_2px_0px_0px_rgba(250,39,66,0.5)]"
                                >
                                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                                    Take a Test
                                </Link>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <span className="material-symbols-outlined text-5xl text-crimson animate-pulse">auto_awesome</span>
                                <p className="text-charcoal/60 font-bold uppercase tracking-widest text-sm">Loading your planner…</p>
                            </div>
                        ) : !hasData ? (
                            /* ── Empty State ──────────────────────────────── */
                            <div className="flex flex-col items-center justify-center py-24 gap-5 border-2 border-dashed border-charcoal/30">
                                <span className="material-symbols-outlined text-6xl text-charcoal/30">calendar_month</span>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold uppercase tracking-wide text-charcoal/60">No Data Yet</h2>
                                    <p className="text-charcoal/40 mt-2 max-w-md">
                                        Your revision planner auto-populates after you complete a practice test. Take your first test to get started!
                                    </p>
                                </div>
                                <Link
                                    href="/practice"
                                    className="px-8 py-3 bg-charcoal text-white text-xs font-black uppercase tracking-widest hover:bg-crimson transition-all"
                                >
                                    Start Practice Test
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                                {/* ── Main Content ─────────────────────────── */}
                                <div className="lg:col-span-8 space-y-10">

                                    {/* Overall Stats */}
                                    {data.overallStats && (
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { label: "Tests Taken", value: data.overallStats.totalTests, icon: "assignment" },
                                                { label: "Avg Score", value: `${data.overallStats.averageScore}%`, icon: "trending_up" },
                                                { label: "Best Score", value: `${data.overallStats.bestScore}%`, icon: "emoji_events" },
                                            ].map((s) => (
                                                <div key={s.label} className="bg-white border-2 border-charcoal shadow-[3px_3px_0px_0px_rgba(55,56,51,1)] p-5 flex flex-col items-center gap-2">
                                                    <span className="material-symbols-outlined text-crimson text-2xl">{s.icon}</span>
                                                    <p className="text-3xl font-black text-charcoal">{s.value}</p>
                                                    <p className="text-[10px] uppercase tracking-widest text-charcoal/50 font-bold">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Weak Topics Revision List */}
                                    {data.weakTopics.length > 0 && (
                                        <section>
                                            <h2 className="text-xl font-bold uppercase tracking-tight mb-5 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-crimson">warning</span>
                                                Topics Requiring Revision
                                            </h2>
                                            <div className="space-y-3">
                                                {data.weakTopics.map((w) => {
                                                    const pc = priorityConfig[w.priority];
                                                    return (
                                                        <div key={w.topic} className={`border border-charcoal/20 p-4 flex items-center justify-between ${pc.border}`}>
                                                            <div>
                                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 ${pc.badge}`}>{pc.label}</span>
                                                                <p className="font-bold text-charcoal mt-1">{w.topic}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-2xl font-black text-crimson">{w.percentage}%</p>
                                                                <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-wider">avg score</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </section>
                                    )}

                                    {/* Strong Topics */}
                                    {data.strongTopics.length > 0 && (
                                        <section>
                                            <h2 className="text-xl font-bold uppercase tracking-tight mb-5 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-green-600">check_circle</span>
                                                Mastered Topics
                                            </h2>
                                            <div className="flex flex-wrap gap-3">
                                                {data.strongTopics.map((s) => (
                                                    <div key={s.topic} className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-300">
                                                        <span className="material-symbols-outlined text-green-600 text-base">check</span>
                                                        <span className="font-bold text-sm text-green-800">{s.topic}</span>
                                                        <span className="text-xs text-green-600 font-black">{s.percentage}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>

                                {/* ── Sidebar: Recent Tests ─────────────────── */}
                                <div className="lg:col-span-4 space-y-6">
                                    <section>
                                        <h2 className="text-xl font-bold uppercase tracking-tight mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-charcoal">history</span>
                                            Recent Tests
                                        </h2>
                                        <div className="space-y-3">
                                            {data.recentTests.map((test) => (
                                                <Link
                                                    key={test.id}
                                                    href={`/api/test/result/${test.id}`}
                                                    className="block bg-white border-2 border-charcoal p-4 hover:shadow-[3px_3px_0px_0px_rgba(55,56,51,1)] transition-all group"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">{test.subject}</p>
                                                            <p className="font-bold text-sm text-charcoal group-hover:text-crimson transition-colors">{test.testName}</p>
                                                            <p className="text-[10px] text-charcoal/40 mt-1">{new Date(test.submittedAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`text-2xl font-black ${gradeColor[test.grade] || "text-charcoal"}`}>{test.grade}</p>
                                                            <p className="text-xs font-bold text-charcoal/60">{test.percentage}%</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
