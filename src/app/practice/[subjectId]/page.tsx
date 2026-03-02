import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { use } from "react";

export default function PracticeSubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
    const { subjectId } = use(params);
    // Determine subject details based on param
    const subjectName = subjectId === "cpp-programming" ? "C++ Programming" : "Java Programming";

    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
            <DashboardHeader
                title={subjectName}
                subtitle="Practice Exams"
                backHref="/practice"
                backText="BACK TO SUBJECTS"
            />

            <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
                {/* Clean Header Section */}
                <div className="mb-12 mt-4 max-w-none">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#373833] tracking-tight mb-4 leading-[1.1] font-sans">
                        {subjectName} <br />
                        <span className="text-[#FF2A4B] font-sans">Practice Exams</span>
                    </h1>
                    <p className="text-lg md:text-[1.15rem] text-charcoal/70 font-medium leading-relaxed max-w-5xl mt-6">
                        Test your knowledge under timed conditions. Begin with the half-module tests to assess your grasp on specific sections, then take the comprehensive full syllabus exam.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Test 1: Half Module (1-5) */}
                    <div className="bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="w-12 h-12 border-2 border-charcoal bg-cream flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px] text-charcoal">assignment</span>
                                </span>
                                <span className="px-3 py-1 bg-white border border-charcoal text-[10px] font-bold uppercase tracking-wider text-charcoal">
                                    Medium
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal mb-2 leading-tight">1st Half Modules</h3>
                            <p className="text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                                Covers Modules 1 through 5, focusing on core programming fundamentals, control flow, and basic OOP principles.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-charcoal font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-charcoal/50">timer</span>
                                    45 Minutes
                                </div>
                                <div className="flex items-center gap-3 text-sm text-charcoal font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-charcoal/50">format_list_numbered</span>
                                    25 Questions
                                </div>
                            </div>
                        </div>

                        <Link href={`/practice/${subjectId}/test/half-1`} className="w-full block py-4 bg-charcoal text-center text-white text-xs font-bold uppercase tracking-widest hover:bg-crimson transition-colors border-2 border-transparent">
                            START PRACTICE
                        </Link>
                    </div>

                    {/* Test 2: Half Module (6-10) */}
                    <div className="bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="w-12 h-12 border-2 border-charcoal bg-cream flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px] text-charcoal">assignment</span>
                                </span>
                                <span className="px-3 py-1 bg-white border border-charcoal text-[10px] font-bold uppercase tracking-wider text-charcoal">
                                    Hard
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal mb-2 leading-tight">2nd Half Modules</h3>
                            <p className="text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                                Covers Modules 6 through 10, focusing on advanced concepts, concurrency, data structures, and algorithms.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-charcoal font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-charcoal/50">timer</span>
                                    45 Minutes
                                </div>
                                <div className="flex items-center gap-3 text-sm text-charcoal font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-charcoal/50">format_list_numbered</span>
                                    25 Questions
                                </div>
                            </div>
                        </div>

                        <Link href={`/practice/${subjectId}/test/half-2`} className="w-full block py-4 bg-charcoal text-center text-white text-xs font-bold uppercase tracking-widest hover:bg-crimson transition-colors border-2 border-transparent">
                            START PRACTICE
                        </Link>
                    </div>

                    {/* Test 3: Full Syllabus */}
                    <div className="bg-charcoal border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(250,39,66,1)] p-8 flex flex-col justify-between h-full text-white">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="w-12 h-12 border-2 border-charcoal bg-white/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px] text-white">school</span>
                                </span>
                                <span className="px-3 py-1 bg-crimson border-none text-[10px] font-bold uppercase tracking-wider text-white">
                                    Exam Level
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 leading-tight">Full Syllabus Exam</h3>
                            <p className="text-sm text-white/70 mb-6 border-b border-white/20 pb-6">
                                A comprehensive, timed mock exam covering the entire length of the course syllabus. Simulates actual university exam constraints.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-white/50">timer</span>
                                    180 Minutes
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-[18px] text-white/50">format_list_numbered</span>
                                    50 Questions
                                </div>
                            </div>
                        </div>

                        <Link href={`/practice/${subjectId}/test/full`} className="w-full bg-white block py-4 text-center text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-crimson hover:text-white transition-colors border-2 border-transparent">
                            BEGIN MOCK EXAM
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
