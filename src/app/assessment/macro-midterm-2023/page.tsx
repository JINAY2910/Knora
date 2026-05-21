"use client";

import AssessmentNav from "@/components/assessment/AssessmentNav";
import AssessmentFooter from "@/components/assessment/AssessmentFooter";

export default function AssessmentPage() {
    const handleNotification = () => alert("Notifications");
    const handleDownload = () => alert("Downloading PDF...");
    const handleShare = () => alert("Sharing results...");
    const handleRetake = () => alert("Retaking exam...");
    const handleNextModule = () => alert("Proceeding to next module...");

    return (
        <div className="bg-cream text-charcoal font-sans min-h-screen flex flex-col selection:bg-crimson selection:text-white">
            <AssessmentNav userInitials="JS" onNotificationClick={handleNotification} />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative flex flex-col justify-center items-center">
                {/* Pattern Grid Background */}
                <div className="absolute inset-0 pattern-grid pointer-events-none z-0 h-96"></div>

                <div className="text-center relative z-10">
                    <p className="text-gray-500 font-sans">No simulation data to display.</p>
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
