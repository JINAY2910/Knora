import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    await dbConnect();
    
    // Fetch user data from MongoDB
    const userData = await User.findOne({ email: session.user?.email }).lean();

    if (!userData) {
        return (
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
                <DashboardHeader title="Profile" subtitle="User Data" />
                <div className="p-10 text-center">User not found in database.</div>
            </main>
        );
    }

    // Safely interpret user progress
    // @ts-ignore
    const progressObject = userData.progress ? Object.fromEntries(userData.progress) : {};

    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cream">
            <DashboardHeader title="My Profile" subtitle="Account & Data" />

            <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Profile Header */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
                        {userData.image ? (
                            <img
                                src={userData.image as string}
                                alt="User Profile"
                                className="w-24 h-24 rounded-full shadow-md object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold text-charcoal">{userData.name as string}</h2>
                            <p className="text-gray-500 font-medium">{userData.email as string}</p>
                            <span className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase rounded-full tracking-wider">
                                {userData.role as string || "Student"}
                            </span>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-4">My Learning Data</h3>
                        
                        {Object.keys(progressObject).length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(progressObject).map(([course, progressValue]) => (
                                    <div key={course} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                                        <span className="font-semibold text-gray-700 capitalize">{course}</span>
                                        <span className="text-crimson font-bold">{String(progressValue)}%</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">assignment</span>
                                <p className="text-gray-500 font-medium">No learning data recorded yet.</p>
                                <p className="text-sm text-gray-400 mt-1">Start practicing to see your progress here!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
