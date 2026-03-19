import Sidebar from "@/components/dashboard/Sidebar";
import ActivityTracker from "@/components/dashboard/ActivityTracker";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex overflow-hidden h-screen bg-cream">
            <ActivityTracker />
            <Sidebar />
            {children}
        </div>
    );
}
