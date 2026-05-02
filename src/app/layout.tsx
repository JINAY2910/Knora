import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import ActivityTracker from "@/components/ActivityTracker";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["300", "400", "500", "600"],
});

const merriweather = Merriweather({
    subsets: ["latin"],
    variable: "--font-merriweather",
    weight: ["400", "700", "900"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: "KNORA - Logic-First Exam Preparation",
    description: "AI-powered university exam preparation platform that replaces PPT-based memorization with logic-driven learning and intelligent testing.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    rel="stylesheet"
                />
            </head>
            <body
                className={`${inter.variable} ${merriweather.variable} bg-background-light text-text-main dark:bg-background-dark dark:text-text-light font-sans selection:bg-primary selection:text-white overflow-x-hidden transition-colors duration-300`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextAuthProvider>
                        <ActivityTracker />
                        {children}
                    </NextAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
