import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex overflow-hidden h-screen bg-cream">
            <Sidebar />
            {children}
        </div>
    );
}
