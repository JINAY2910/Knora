"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard/subjects", icon: "grid_view" },
    { name: "Practice", href: "/practice/logic-syllogisms-hard", icon: "edit_document" },
    { name: "Revision Planner", href: "/planner", icon: "calendar_today" },
    { name: "Analytics", href: "/assessment/macro-midterm-2023", icon: "analytics" },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const pathname = usePathname();

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
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${isCollapsed ? "w-20" : "w-64"
                } bg-charcoal text-white flex-shrink-0 hidden lg:flex flex-col h-screen z-20 transition-all duration-300 ease-in-out border-r border-charcoal-light relative cursor-pointer`}
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
                                { name: "Semester 1", color: "bg-blue-500" },
                                { name: "Semester 2", color: "bg-green-500" },
                                { name: "Semester 3", color: "bg-yellow-500" },
                                { name: "Semester 4", color: "bg-crimson", active: true },
                            ].map((sem) => (
                                <button
                                    key={sem.name}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${sem.active
                                        ? "text-white bg-white/5"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    title={isCollapsed ? sem.name : ""}
                                >
                                    <span className={`w-2 h-2 rounded-full ${sem.color} flex-shrink-0`}></span>
                                    <span>{sem.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-charcoal-light">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors ${isCollapsed ? "justify-center" : ""}`}
                >
                    <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 border border-gray-600">
                        JS
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">
                                Jinay Shah
                            </p>
                            <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">Information Technology</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
