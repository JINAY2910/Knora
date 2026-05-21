"use client";

import AssessmentNav from "@/components/assessment/AssessmentNav";
import AssessmentHeader from "@/components/assessment/AssessmentHeader";
import SkillMatrix from "@/components/assessment/SkillMatrix";
import StatCard from "@/components/assessment/StatCard";
import AssessmentFooter from "@/components/assessment/AssessmentFooter";

// Mock assessment data
const assessmentData = {
    examType: "Mid-Term Simulation",
    title: "Advanced Macroeconomics:<br/>Global Markets Analysis",
    date: "October 24, 2023",
    duration: "2h 15m",
    score: 88,
    totalScore: 100,
    grade: "A-",
    status: "Completed" as const,

    skills: {
        logic: 96,
        recall: 80,
        analysis: 75,
        speed: 72,
        structure: 90,
    },
};

export default function AssessmentPage() {
    const handleNotification = () => alert("Notifications");
    const handleDownload = () => alert("Downloading PDF...");
    const handleShare = () => alert("Sharing results...");
    const handleRetake = () => alert("Retaking exam...");
    const handleNextModule = () => alert("Proceeding to next module...");

    return (
        <div className="bg-cream text-charcoal font-sans min-h-screen flex flex-col selection:bg-crimson selection:text-white">
            <AssessmentNav userInitials="JS" onNotificationClick={handleNotification} />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative flex flex-col justify-center">
                {/* Pattern Grid Background */}
                <div className="absolute inset-0 pattern-grid pointer-events-none z-0 h-96"></div>

                <AssessmentHeader
                    examType={assessmentData.examType}
                    title={assessmentData.title}
                    date={assessmentData.date}
                    duration={assessmentData.duration}
                    score={assessmentData.score}
                    totalScore={assessmentData.totalScore}
                    grade={assessmentData.grade}
                    status={assessmentData.status}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 relative z-10 items-center">
                    <SkillMatrix skills={assessmentData.skills} />

                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="Correct Points" value={42} total={50} />
                            <StatCard label="Missing Concepts" value={5} suffix="Items" accentColor="crimson" />
                            <StatCard label="Logical Gaps" value={3} suffix="Detected" accentColor="crimson" />
                        </div>
                    </div>
                </div>
            </main>

            <AssessmentFooter
                onDownload={handleDownload}
                onShare={handleShare}
                onRetake={handleRetake}
                onNextModule={handleNextModule}
            />
        </div>
    );
}
