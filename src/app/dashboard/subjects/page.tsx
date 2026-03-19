import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FeaturedCourse from "@/components/dashboard/FeaturedCourse";
import SubjectCard from "@/components/dashboard/SubjectCard";
import HeatmapWidget from "@/components/dashboard/HeatmapWidget";
import GoalsWidget from "@/components/dashboard/GoalsWidget";
import AIInsightWidget from "@/components/dashboard/AIInsightWidget";

export default function SubjectsPage() {
    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
            <DashboardHeader />

            <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
                <FeaturedCourse />

                <div className="grid grid-cols-12 gap-10">
                    {/* Subject Cards Grid */}
                    <div className="col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min">
                        {/* Java Programming */}
                        <SubjectCard
                            title="Java Programming"
                            modules={10}
                            topics={56}
                            progress={65}
                            status="active"
                            icon="coffee"
                            href="/concept/java-intro"
                            priorityTopics={[
                                {
                                    title: "JVM Architecture",
                                    type: "read",
                                    duration: "15 MIN READ",
                                    difficulty: "HIGH",
                                },
                                {
                                    title: "Class Fundamentals",
                                    type: "read",
                                    duration: "18 MIN READ",
                                    difficulty: "MEDIUM",
                                },
                                {
                                    title: "String Immutability",
                                    type: "read",
                                    duration: "14 MIN READ",
                                    difficulty: "MEDIUM",
                                },
                            ]}
                        />

                        {/* C++ Programming */}
                        <SubjectCard
                            title="C++ Programming"
                            modules={6}
                            topics={45}
                            progress={25}
                            status="active"
                            icon="terminal"
                            priorityTopics={[
                                {
                                    title: "Pointers & Memory",
                                    type: "read",
                                    duration: "18 MIN READ",
                                    difficulty: "HARD",
                                },
                                {
                                    title: "STL Containers",
                                    type: "video",
                                    duration: "25 MIN",
                                    difficulty: "MEDIUM",
                                },
                                {
                                    title: "Move Semantics",
                                    type: "practice",
                                    duration: "PRACTICE SET",
                                    difficulty: "HARD",
                                    locked: true,
                                }
                            ]}
                        />
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="hidden xl:block col-span-4 space-y-8">
                        <HeatmapWidget />
                        <GoalsWidget />
                        <AIInsightWidget />
                    </div>
                </div>
            </div>
        </main>
    );
}
