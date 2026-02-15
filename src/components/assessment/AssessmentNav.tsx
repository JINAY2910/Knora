"use client";

import Link from "next/link";

interface AssessmentNavProps {
    userInitials: string;
    onNotificationClick?: () => void;
}

export default function AssessmentNav({ userInitials, onNotificationClick }: AssessmentNavProps) {
    return (
        <nav className="sticky top-0 z-50 w-full border-b-2 border-charcoal bg-cream/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="KNORA" className="w-10 h-10" />
                        <span className="font-serif font-bold text-2xl tracking-tight text-charcoal">
                            KNORA{" "}
                            <span className="text-crimson text-sm font-sans font-medium uppercase tracking-widest ml-1 align-middle">
                                Assessment
                            </span>
                        </span>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={onNotificationClick}
                            className="p-2 hover:bg-charcoal/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-charcoal">notifications</span>
                        </button>
                        <div className="h-10 w-10 bg-charcoal border-2 border-charcoal relative overflow-hidden">
                            <span className="absolute inset-0 flex items-center justify-center text-cream font-serif italic">
                                {userInitials}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
