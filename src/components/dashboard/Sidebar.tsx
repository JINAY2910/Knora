"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-charcoal text-white flex-shrink-0 hidden lg:flex flex-col h-screen z-20">
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-charcoal-light">
                <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="KNORA Logo" className="w-9 h-9" />
                    <span className="text-xl font-bold tracking-tight text-white">KNORA</span>
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-0.5 overflow-y-auto">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    <span>Dashboard</span>
                </Link>
                <Link
                    href="/dashboard/subjects"
                    className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium bg-white text-charcoal"
                >
                    <span className="material-symbols-outlined text-[20px]">school</span>
                    <span>Subjects</span>
                </Link>
                <Link
                    href="/dashboard/practice"
                    className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    <span>Practice</span>
                </Link>
                <Link
                    href="/dashboard/mock-tests"
                    className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">alarm</span>
                    <span>Mock Tests</span>
                </Link>
                <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">analytics</span>
                    <span>Analytics</span>
                </Link>
                <Link
                    href="/planner"
                    className="flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    <span>Revision Planner</span>
                </Link>

                {/* Archives Section */}
                <div className="pt-6 mt-4 border-t border-charcoal-light">
                    <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                        Archives
                    </h3>
                    <Link
                        href="/dashboard/archive/sem3"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        <span>Semester 3</span>
                    </Link>
                    <Link
                        href="/dashboard/archive/sem4"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="w-1 h-1 bg-crimson rounded-full"></span>
                        <span>Semester 4</span>
                    </Link>
                </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-charcoal-light">
                <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 bg-gray-600 rounded-sm flex items-center justify-center text-white font-semibold text-sm">
                        SJ
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            Sarah Jensen
                        </p>
                        <p className="text-xs text-gray-400 truncate">Computer Science</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
