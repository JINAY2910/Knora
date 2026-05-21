"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard/subjects", icon: "grid_view" },
    { name: "Practice", href: "/practice", icon: "edit_document" },
    { name: "Revision Planner", href: "/planner", icon: "calendar_today" },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const stored = localStorage.getItem("isSidebarCollapsed");
        if (stored) {
            setIsCollapsed(JSON.parse(stored));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("isSidebarCollapsed", JSON.stringify(isCollapsed));
        }
    }, [isCollapsed, isInitialized]);

    return (
        <aside
            className={`${isCollapsed ? "w-20" : "w-64"
                } bg-charcoal text-white flex-shrink-0 hidden lg:flex flex-col h-screen z-20 transition-all duration-300 ease-in-out border-r border-charcoal-light relative`}
        >
            {/* Header */}
            <div className={`h-20 flex items-center ${isCollapsed ? "justify-center" : "px-6"} border-b border-charcoal-light transition-all`}>
                <Link
                    href="/"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                    <img src="/logo.png" alt="KNORA Logo" className="w-9 h-9 flex-shrink-0" />
                    {!isCollapsed && (
                        <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">KNORA</span>
                    )}
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-white text-charcoal"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                } ${isCollapsed ? "justify-center" : ""}`}
                            title={isCollapsed ? item.name : ""}
                        >
                            <span className="material-symbols-outlined text-[20px] flex-shrink-0">{item.icon}</span>
                            {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                        </Link>
                    );
                })}

                {/* Semester Selection (divider) */}
                {!isCollapsed && (
                    <div className="pt-6 mt-4 border-t border-charcoal-light">
                        <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 whitespace-nowrap">
                            Semesters
                        </h3>

                        <div className="space-y-1">
                            {[
                                { name: "Semester 1", href: "#", color: "bg-blue-500" },
                                { name: "Semester 2", href: "#", color: "bg-green-500" },
                                { name: "Semester 3", href: "/dashboard/semester-3", color: "bg-yellow-500" },
                                { name: "Semester 4", href: "/dashboard/subjects", color: "bg-crimson" },
                            ].map((sem) => {
                                const isSemActive = pathname === sem.href;
                                return (
                                <Link
                                    key={sem.name}
                                    href={sem.href}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${isSemActive
                                        ? "text-white bg-white/5"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    title={isCollapsed ? sem.name : ""}
                                >
                                    <span className={`w-2 h-2 rounded-full ${sem.color} flex-shrink-0`}></span>
                                    <span>{sem.name}</span>
                                </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-charcoal-light flex flex-col gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors text-gray-400 hover:text-white ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <line x1={isCollapsed ? 15 : 9} x2={isCollapsed ? 15 : 9} y1="3" y2="21" />
                        <path d={isCollapsed ? "m11 15 3-3-3-3" : "m15 15-3-3 3-3"} />
                    </svg>
                    {!isCollapsed && <span className="text-[15px] font-medium text-[#e2e8f0]">Collapse</span>}
                </button>
                <Link
                    href="/dashboard/profile"
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors ${isCollapsed ? "justify-center" : ""} ${pathname === "/dashboard/profile" ? "bg-white/10" : ""}`}
                >
                    <div className="h-9 w-9 border-2 border-charcoal bg-crimson flex items-center justify-center text-white overflow-hidden font-sans font-bold text-sm shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] shrink-0">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            session?.user?.name?.charAt(0) || "U"
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">
                                {session?.user?.name || "User Profile"}
                            </p>
                            <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">Account & Settings</p>
                        </div>
                    )}
                </Link>
            </div>
        </aside>
    );
}
