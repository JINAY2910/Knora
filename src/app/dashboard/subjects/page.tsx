import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FeaturedCourse from "@/components/dashboard/FeaturedCourse";
import SubjectCard from "@/components/dashboard/SubjectCard";
import VelocityWidget from "@/components/dashboard/VelocityWidget";
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
                        {/* Computer Networks - Expanded */}
                        <SubjectCard
                            title="Computer Networks"
                            modules={4}
                            topics={28}
                            progress={45}
                            status="active"
                            icon="router"
                            priorityTopics={[
                                {
                                    title: "OSI Model Layering",
                                    type: "read",
                                    duration: "15 MIN READ",
                                    pyqCount: 5,
                                },
                                {
                                    title: "TCP vs UDP",
                                    type: "video",
                                    duration: "VIDEO • 8 MIN",
                                    difficulty: "MEDIUM",
                                },
                                {
                                    title: "Subnetting Basics",
                                    type: "practice",
                                    duration: "PRACTICE SET",
                                    difficulty: "LOW",
                                    locked: true,
                                },
                            ]}
                        />

                        {/* Database Management */}
                        <SubjectCard
                            title="Database Management"
                            modules={6}
                            topics={42}
                            progress={12}
                            status="active"
                            icon="database"
                        />

                        {/* Operating Systems */}
                        <SubjectCard
                            title="Operating Systems"
                            modules={5}
                            topics={35}
                            progress={88}
                            status="complete"
                            icon="psychology"
                        />

                        {/* Software Engineering */}
                        <SubjectCard
                            title="Software Engineering"
                            modules={3}
                            topics={18}
                            progress={0}
                            status="locked"
                            icon="code"
                        />
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="hidden xl:block col-span-4 space-y-8">
                        <VelocityWidget />
                        <GoalsWidget />
                        <AIInsightWidget />
                    </div>
                </div>
            </div>
        </main>
    );
}
