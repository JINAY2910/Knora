import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PracticeSubjectCard from "@/components/practice/PracticeSubjectCard";

export default function PracticeDashboardPage() {
    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
            <DashboardHeader
                title="Practice Mode"
                subtitle="Test Your Knowledge"
                backHref="/dashboard/subjects"
                backText="BACK TO DASHBOARD"
            />

            <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
                {/* Clean Header Section */}
                <div className="mb-12 mt-4 max-w-none">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#373833] tracking-tight mb-4 leading-[1.1] font-sans">
                        Test Your Knowledge <br />
                        <span className="text-[#FF2A4B] font-sans">Syllabus Exams</span>
                    </h1>
                    <p className="text-lg md:text-[1.15rem] text-charcoal/70 font-medium leading-relaxed max-w-5xl mt-6">
                        Select a subject below to take half-module tests or full syllabus mock exams designed to simulate real university testing environments.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Subject Cards Grid */}
                    <div className="col-span-12 xl:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
                        {/* Java Programming */}
                        <PracticeSubjectCard
                            title="Java Programming"
                            modules={10}
                            testsTarget={3}
                            completedTests={0}
                            status="active"
                            icon="coffee"
                            href="/practice/java-programming"
                            tests={[
                                {
                                    title: "1st Half Module Test (1-5)",
                                    duration: "45 MINS",
                                    difficulty: "MEDIUM",
                                    completed: false,
                                    locked: false,
                                },
                                {
                                    title: "2nd Half Module Test (6-10)",
                                    duration: "45 MINS",
                                    difficulty: "HARD",
                                    completed: false,
                                    locked: false,
                                },
                                {
                                    title: "Full Syllabus Exam",
                                    duration: "180 MINS",
                                    difficulty: "EXAM LEVEL",
                                    completed: false,
                                    locked: false,
                                },
                            ]}
                        />

                        {/* C++ Programming */}
                        <PracticeSubjectCard
                            title="C++ Programming"
                            modules={6}
                            testsTarget={3}
                            completedTests={0}
                            status="locked"
                            icon="terminal"
                            href="/practice/cpp-programming"
                            tests={[
                                {
                                    title: "1st Half Module Test",
                                    duration: "45 MINS",
                                    difficulty: "MEDIUM",
                                    completed: false,
                                    locked: true,
                                },
                                {
                                    title: "2nd Half Module Test",
                                    duration: "45 MINS",
                                    difficulty: "HARD",
                                    completed: false,
                                    locked: true,
                                },
                                {
                                    title: "Full Syllabus Exam",
                                    duration: "180 MINS",
                                    difficulty: "EXAM LEVEL",
                                    completed: false,
                                    locked: true,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
