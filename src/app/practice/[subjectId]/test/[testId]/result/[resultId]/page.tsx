"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface QuestionResult {
    questionId: number;
    question: string;
    topic: string;
    tags: string[];
    userAnswer: string;
    correctAnswer: string;
    score: number;
    maxScore: number;
    status: "correct" | "partial" | "wrong" | "unanswered";
    aiFeedback: string;
    isTheory: boolean;
}

interface WeakTopic {
    topic: string;
    percentage: number;
    priority: "high" | "medium" | "low";
}

interface TestResultData {
    _id: string;
    testName: string;
    subject: string;
    totalScore: number;
    maxScore: number;
    percentage: number;
    grade: string;
    questionResults: QuestionResult[];
    weakTopics: WeakTopic[];
    strongTopics: { topic: string; percentage: number }[];
    aiSuggestions: string;
    submittedAt: string;
}

const gradeColor: Record<string, string> = {
    "A+": "text-green-600", A: "text-green-500", B: "text-blue-500",
    C: "text-yellow-600", D: "text-orange-500", F: "text-crimson",
};

const statusConfig = {
    correct: { bg: "bg-green-50 border-green-400", badge: "bg-green-500", label: "Correct", icon: "check_circle" },
    partial: { bg: "bg-yellow-50 border-yellow-400", badge: "bg-yellow-500", label: "Partial", icon: "warning" },
    wrong: { bg: "bg-red-50 border-red-400", badge: "bg-crimson", label: "Wrong", icon: "cancel" },
    unanswered: { bg: "bg-gray-50 border-gray-300", badge: "bg-gray-400", label: "Unanswered", icon: "remove_circle" },
};

const priorityConfig = {
    high: { bg: "bg-crimson/10 border-crimson", text: "text-crimson", label: "HIGH PRIORITY" },
    medium: { bg: "bg-yellow-50 border-yellow-400", text: "text-yellow-700", label: "MEDIUM" },
    low: { bg: "bg-blue-50 border-blue-300", text: "text-blue-600", label: "LOW" },
};

function DownloadPDFButton({ resultId }: { resultId: string }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const { jsPDF } = await import("jspdf");
            const autoTable = (await import("jspdf-autotable")).default;

            const res = await fetch(`/api/test/result/${resultId}`);
            const data: TestResultData = await res.json();

            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            const pageW = doc.internal.pageSize.getWidth();

            // Header
            doc.setFillColor(55, 56, 51);
            doc.rect(0, 0, pageW, 28, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.text("KNORA — Test Report", 14, 14);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text(`${data.subject} · ${data.testName} · ${new Date(data.submittedAt).toLocaleDateString()}`, 14, 22);

            // Score summary
            doc.setTextColor(55, 56, 51);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(13);
            doc.text("Score Summary", 14, 40);

            autoTable(doc, {
                startY: 44,
                head: [["Total Score", "Max Score", "Percentage", "Grade"]],
                body: [[data.totalScore, data.maxScore, `${data.percentage}%`, data.grade]],
                styles: { fontSize: 10, halign: "center" },
                headStyles: { fillColor: [55, 56, 51] },
            });

            const y1 = (doc as any).lastAutoTable.finalY + 10;

            // Weak Topics
            doc.setFontSize(13);
            doc.setFont("helvetica", "bold");
            doc.text("Weak Topics (Requires Revision)", 14, y1);

            if (data.weakTopics.length > 0) {
                autoTable(doc, {
                    startY: y1 + 4,
                    head: [["Topic", "Score %", "Priority"]],
                    body: data.weakTopics.map((w) => [w.topic, `${w.percentage}%`, w.priority.toUpperCase()]),
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [250, 39, 66] },
                });
            } else {
                doc.setFontSize(10);
                doc.setFont("helvetica", "italic");
                doc.setTextColor(100);
                doc.text("No weak topics detected — excellent performance!", 14, y1 + 10);
                doc.setTextColor(55, 56, 51);
            }

            const y2 = (doc as any).lastAutoTable?.finalY + 10 || y1 + 20;

            // AI Suggestions
            if (data.aiSuggestions) {
                doc.setFontSize(13);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(55, 56, 51);
                doc.text("AI Tutor Suggestions", 14, y2);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                const lines = doc.splitTextToSize(data.aiSuggestions, pageW - 28);
                doc.text(lines, 14, y2 + 6);
            }

            // Question Breakdown (new page)
            doc.addPage();
            doc.setFontSize(13);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(55, 56, 51);
            doc.text("Question-by-Question Breakdown", 14, 20);

            autoTable(doc, {
                startY: 24,
                head: [["Q#", "Topic", "Score", "Status", "AI Feedback"]],
                body: data.questionResults.map((q) => [
                    `Q${q.questionId}`,
                    q.topic,
                    `${q.score}/${q.maxScore}`,
                    q.status.toUpperCase(),
                    q.aiFeedback.substring(0, 80) + (q.aiFeedback.length > 80 ? "…" : ""),
                ]),
                styles: { fontSize: 7, overflow: "linebreak" },
                headStyles: { fillColor: [55, 56, 51] },
                columnStyles: { 4: { cellWidth: 80 } },
            });

            doc.save(`knora-report-${data.testName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
        } catch (err) {
            console.error("PDF generation error:", err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
        >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {loading ? "Generating PDF…" : "Download PDF Report"}
        </button>
    );
}

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();
    const { subjectId, testId, resultId } = params as { subjectId: string; testId: string; resultId: string };

    const [result, setResult] = useState<TestResultData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedQ, setExpandedQ] = useState<number[]>([]);

    useEffect(() => {
        fetch(`/api/test/result/${resultId}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    setResult(data);
                    // Auto-expand wrong/partial answers
                    setExpandedQ(data.questionResults.filter((q: QuestionResult) => q.status !== "correct").map((q: QuestionResult) => q.questionId));
                }
            })
            .catch(() => setError("Failed to load result."))
            .finally(() => setLoading(false));
    }, [resultId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center flex-col gap-4">
                <span className="material-symbols-outlined text-6xl text-crimson animate-pulse">auto_awesome</span>
                <p className="text-charcoal font-bold uppercase tracking-widest text-sm">Loading Your Results…</p>
            </div>
        );
    }

    if (error || !result) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <p className="text-crimson font-bold">{error || "Result not found."}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f7f4] text-charcoal font-sans">
            {/* Top Banner */}
            <div className="bg-charcoal text-cream px-8 py-5 flex justify-between items-center border-b-4 border-crimson">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">{result.subject}</p>
                    <h1 className="text-xl font-bold uppercase tracking-wide">{result.testName} — Results</h1>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/planner"
                        className="flex items-center gap-2 px-5 py-2.5 bg-crimson text-white text-xs font-black uppercase tracking-widest border-2 border-crimson hover:bg-white hover:text-crimson transition-all shadow-[2px_2px_0px_0px_rgba(250,39,66,0.5)]"
                    >
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        Revision Planner
                    </Link>
                    <DownloadPDFButton resultId={resultId} />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

                {/* ── Score Summary ────────────────────────────────── */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Score", value: `${result.totalScore}/${result.maxScore}`, icon: "scoreboard" },
                        { label: "Percentage", value: `${result.percentage}%`, icon: "percent" },
                        { label: "Grade", value: result.grade, icon: "grade", colored: true },
                        { label: "Weak Topics", value: result.weakTopics.length, icon: "warning" },
                    ].map((card) => (
                        <div key={card.label} className="bg-white border-2 border-charcoal shadow-[3px_3px_0px_0px_rgba(55,56,51,1)] p-6 flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-crimson text-2xl">{card.icon}</span>
                            <p className="text-xs uppercase tracking-widest text-charcoal/50 font-bold">{card.label}</p>
                            <p className={`text-3xl font-black ${card.colored ? gradeColor[result.grade] : "text-charcoal"}`}>
                                {card.value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* ── AI Suggestions ──────────────────────────────── */}
                {result.aiSuggestions && (
                    <section className="bg-charcoal text-cream p-7 border-l-4 border-crimson shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-crimson">auto_awesome</span>
                            <h2 className="text-sm font-black uppercase tracking-widest">AI Tutor Feedback</h2>
                        </div>
                        <p className="text-gray-200 leading-relaxed text-sm">{result.aiSuggestions}</p>
                    </section>
                )}

                {/* ── Topic Performance ────────────────────────────── */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-tight border-b-2 border-charcoal pb-3 mb-6">
                        Topic Performance
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(
                            result.questionResults.reduce((acc: Record<string, { score: number; max: number }>, q) => {
                                if (!acc[q.topic]) acc[q.topic] = { score: 0, max: 0 };
                                acc[q.topic].score += q.score;
                                acc[q.topic].max += q.maxScore;
                                return acc;
                            }, {})
                        ).sort((a, b) => (a[1].score / a[1].max) - (b[1].score / b[1].max)).map(([topic, { score, max }]) => {
                            const pct = max > 0 ? Math.round((score / max) * 100) : 0;
                            const barColor = pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-yellow-400" : "bg-crimson";
                            return (
                                <div key={topic} className="flex items-center gap-4">
                                    <p className="text-xs font-bold uppercase tracking-wide w-52 shrink-0 truncate">{topic}</p>
                                    <div className="flex-1 h-3 bg-charcoal/10 border border-charcoal/20">
                                        <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                                    </div>
                                    <p className="text-xs font-black w-12 text-right">{pct}%</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Weak Topics Revision List ────────────────────── */}
                {result.weakTopics.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-tight border-b-2 border-charcoal pb-3 mb-6">
                            🔴 Topics Added to Revision Plan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {result.weakTopics.map((w) => {
                                const pc = priorityConfig[w.priority];
                                return (
                                    <div key={w.topic} className={`border-2 p-4 ${pc.bg}`}>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${pc.text}`}>{pc.label}</span>
                                        <p className="font-bold text-charcoal mt-1">{w.topic}</p>
                                        <p className={`text-2xl font-black mt-2 ${pc.text}`}>{w.percentage}%</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ── Question Breakdown ───────────────────────────── */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-tight border-b-2 border-charcoal pb-3 mb-6">
                        Question-by-Question Breakdown
                    </h2>
                    <div className="space-y-4">
                        {result.questionResults.map((q) => {
                            const sc = statusConfig[q.status];
                            const isExpanded = expandedQ.includes(q.questionId);
                            return (
                                <div key={q.questionId} className={`border-2 ${sc.bg}`}>
                                    <div
                                        className="p-4 flex justify-between items-start cursor-pointer"
                                        onClick={() => setExpandedQ((prev) =>
                                            prev.includes(q.questionId) ? prev.filter((x) => x !== q.questionId) : [...prev, q.questionId]
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-lg">{sc.icon}</span>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-charcoal/50">Q{q.questionId} · {q.topic}</p>
                                                <p className="font-bold text-sm mt-0.5 line-clamp-1">{q.question}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider ${sc.badge}`}>{sc.label}</span>
                                            <span className="font-black text-lg">{q.score}/{q.maxScore}</span>
                                            <span className="material-symbols-outlined text-charcoal/50">{isExpanded ? "expand_less" : "expand_more"}</span>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="border-t-2 border-charcoal/20 grid grid-cols-1 md:grid-cols-2">
                                            <div className="p-5 border-r border-charcoal/10">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Your Answer</p>
                                                <p className="text-sm text-charcoal leading-relaxed whitespace-pre-wrap">
                                                    {q.userAnswer || <span className="italic text-charcoal/40">No answer provided</span>}
                                                </p>
                                                {!q.isTheory && q.correctAnswer && q.status !== "correct" && (
                                                    <div className="mt-3 p-3 bg-green-50 border border-green-300">
                                                        <p className="text-[10px] uppercase tracking-widest font-bold text-green-700 mb-1">Correct Answer</p>
                                                        <p className="text-sm font-medium text-green-800">{q.correctAnswer}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-crimson mb-2 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">auto_awesome</span> AI Feedback
                                                </p>
                                                <p className="text-sm text-charcoal leading-relaxed">{q.aiFeedback}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Footer nav */}
                <div className="flex gap-4 pt-4 pb-12">
                    <Link
                        href={`/practice/${subjectId}`}
                        className="px-6 py-3 border-2 border-charcoal text-xs font-black uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all"
                    >
                        Back to Practice
                    </Link>
                    <Link
                        href="/planner"
                        className="px-6 py-3 bg-crimson text-white border-2 border-crimson text-xs font-black uppercase tracking-widest hover:bg-charcoal hover:border-charcoal transition-all"
                    >
                        View Revision Planner
                    </Link>
                </div>
            </div>
        </div>
    );
}
