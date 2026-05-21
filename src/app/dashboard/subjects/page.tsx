import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FeaturedCourse from "@/components/dashboard/FeaturedCourse";
import SubjectCard from "@/components/dashboard/SubjectCard";
import HeatmapWidget from "@/components/dashboard/HeatmapWidget";
import GoalsWidget from "@/components/dashboard/GoalsWidget";
import dbConnect from "@/lib/mongodb";
import Subject from "@/models/Subject";

// Tell Next.js not to statically render this page
export const dynamic = 'force-dynamic';

export default async function SubjectsPage() {
    await dbConnect();

    // Fetch subjects for semester 4
    const subjects = await Subject.find({ semester: 4 }).lean();

    // Find a featured course if any exists in this semester
    const featuredSubject = subjects.find(s => s.isFeatured) || null;

    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
            <DashboardHeader />

            <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
                {featuredSubject && (
                    <FeaturedCourse
                        title={featuredSubject.title}
                        description={featuredSubject.featuredDescription || ""}
                        href={featuredSubject.href}
                        progress={featuredSubject.progress}
                    />
                )}

                <div className="grid grid-cols-12 gap-10">
                    {/* Subject Cards Grid */}
                    <div className="col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min">
                        {subjects.map((subject: any) => (
                            <SubjectCard
                                key={subject._id.toString()}
                                title={subject.title}
                                modules={subject.modules}
                                topics={subject.topics}
                                progress={subject.progress}
                                status={subject.status}
                                icon={subject.icon}
                                href={subject.href}
                                priorityTopics={subject.priorityTopics}
                            />
                        ))}
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="hidden xl:block col-span-4 space-y-8">
                        <HeatmapWidget />
                        <GoalsWidget />
                    </div>
                </div>
            </div>
        </main>
    );
}
