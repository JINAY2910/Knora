"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
    backHref?: string;
    backText?: string;
}

export default function DashboardHeader({
    title = "My Subjects",
    subtitle = "Computer Science • Semester 4",
    backHref,
    backText = "Back"
}: DashboardHeaderProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const notificationRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle click outside to close dropdowns
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const mockSearchResults = [
        { title: "Introduction to Operating Systems", type: "Subject" },
        { title: "Binary Search Trees", type: "Concept" },
        { title: "Network Protocols Practice", type: "Practice" },
    ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <header className="h-20 flex items-center justify-between px-8 bg-cream dark:bg-background-dark editorial-border-b dark:border-white/10 z-10 sticky top-0 transition-colors duration-300">
            {backHref ? (
                <div className="flex items-center h-full">
                    <Link href={backHref} className="flex items-center gap-2 text-[12px] font-bold text-charcoal/60 dark:text-text-light/60 hover:text-crimson dark:hover:text-crimson-light uppercase tracking-widest transition-colors py-2 px-3 -ml-3 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        {backText}
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-0.5 justify-center h-full">
                    <h1 className="text-xl font-bold text-charcoal dark:text-text-light transition-colors">{title}</h1>
                    <p className="text-[10px] font-semibold text-charcoal/50 dark:text-text-light/50 uppercase tracking-wider transition-colors">
                        {subtitle}
                    </p>
                </div>
            )}

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block" ref={searchRef}>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-charcoal/30 dark:text-text-light/30 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">search</span>
                    </span>
                    <input
                        className="w-64 pl-10 pr-4 py-2 text-sm bg-white dark:bg-surface-dark border border-gray-300 dark:border-surface-darker rounded-sm focus:border-crimson dark:focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none placeholder-charcoal/40 dark:placeholder-text-light/40 text-charcoal dark:text-text-light transition-all"
                        placeholder="Search topics, concepts..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                    />
                    
                    {/* Search Dropdown */}
                    {isSearchFocused && searchQuery.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-sm shadow-lg overflow-hidden z-50 transition-colors">
                            {mockSearchResults.length > 0 ? (
                                <ul className="max-h-64 overflow-y-auto">
                                    {mockSearchResults.map((result, idx) => (
                                        <li key={idx} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-surface-darker cursor-pointer border-b border-gray-100 dark:border-white/5 last:border-0 transition-colors">
                                            <p className="text-sm font-medium text-charcoal dark:text-text-light transition-colors">{result.title}</p>
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-crimson dark:text-crimson-light transition-colors">{result.type}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-4 text-center text-sm text-charcoal/60 dark:text-text-light/60 transition-colors">
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Streak Indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-surface-dark border border-gray-300 dark:border-surface-darker rounded-sm transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-crimson">
                        local_fire_department
                    </span>
                    <span className="text-sm font-semibold text-charcoal dark:text-text-light transition-colors">12 Day Streak</span>
                </div>

                {/* Theme Toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative p-2 text-charcoal dark:text-text-light hover:text-crimson dark:hover:text-crimson-light transition-colors rounded-sm hover:bg-black/5 dark:hover:bg-white/5"
                        aria-label="Toggle theme"
                    >
                        <span className="material-symbols-outlined text-[22px]">
                            {theme === "dark" ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                )}

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button 
                        className="relative p-2 text-charcoal dark:text-text-light hover:text-crimson dark:hover:text-crimson-light transition-colors rounded-sm hover:bg-black/5 dark:hover:bg-white/5"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <span className="material-symbols-outlined text-[22px]">notifications</span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson rounded-full border-2 border-cream dark:border-background-dark transition-colors"></span>
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-sm shadow-xl z-50 overflow-hidden transition-colors">
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-surface-darker transition-colors">
                                <h3 className="text-sm font-bold text-charcoal dark:text-text-light transition-colors">Notifications</h3>
                                <button className="text-[10px] font-bold text-crimson dark:text-crimson-light uppercase tracking-wider hover:underline transition-colors">Mark all as read</button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-surface-darker cursor-pointer transition-colors">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-crimson/10 dark:bg-crimson/20 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-[16px] text-crimson dark:text-crimson-light">assignment</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-charcoal dark:text-text-light font-medium transition-colors">New assignment added</p>
                                            <p className="text-xs text-charcoal/60 dark:text-text-light/60 mt-0.5 transition-colors">Database Management Systems practice set is ready.</p>
                                            <p className="text-[10px] text-charcoal/40 dark:text-text-light/40 mt-1 uppercase font-semibold transition-colors">2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 hover:bg-gray-50 dark:hover:bg-surface-darker cursor-pointer transition-colors">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-[16px] text-green-700 dark:text-green-400">emoji_events</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-charcoal dark:text-text-light font-medium transition-colors">Goal Achieved!</p>
                                            <p className="text-xs text-charcoal/60 dark:text-text-light/60 mt-0.5 transition-colors">You completed your weekly study goal for Operating Systems.</p>
                                            <p className="text-[10px] text-charcoal/40 dark:text-text-light/40 mt-1 uppercase font-semibold transition-colors">Yesterday</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 border-t border-gray-200 dark:border-white/10 text-center bg-gray-50 dark:bg-surface-darker hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                <span className="text-xs font-bold text-charcoal dark:text-text-light uppercase tracking-wider transition-colors">View All</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
