"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <img src="/logo.png" alt="KNORA Logo" className="w-10 h-10" />
                        <span className="text-xl font-serif font-bold tracking-tight text-text-main">
                            KNORA
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link
                                href="#method"
                                className="text-sm font-medium text-text-main hover:text-primary transition-colors"
                            >
                                Method
                            </Link>
                            <Link
                                href="#features"
                                className="text-sm font-medium text-text-main hover:text-primary transition-colors"
                            >
                                AI Examiner
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm font-medium text-text-main hover:text-primary transition-colors"
                            >
                                Pricing
                            </Link>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            href="/dashboard/subjects"
                            className="btn-primary px-5 py-2.5 text-sm font-semibold transition-all border border-background-dark"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded text-text-main hover:text-primary focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <span className="material-icons-round">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
