import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import { dbmsModules } from "@/data/dbmsModules";
import Link from "next/link";

export default function DbmsSecurityPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 5"
                conceptTitle="Hack & Patch Cyber Range"
                userInitials="YY"
                examMode={false}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-security" />

                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-blue-500 w-[100%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">security</span> Module Complete
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Hack & Patch Cyber Range
                            </h1>
                        </div>

                        <div className="prose-custom text-charcoal max-w-none">
                            <p className="mb-6 text-lg leading-relaxed">Database security is paramount. A single misconfiguration or vulnerability can expose millions of user records.</p>
        <CalloutBox type="mistake">
            <p><strong>SQL Injection:</strong> The most common vulnerability. Never concatenate user input directly into your SQL queries. Always use parameterized queries or ORMs.</p>
        </CalloutBox>
        <div className="bg-charcoal text-white p-6 rounded-lg font-mono text-sm mt-8 shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
            <p className="text-red-400">BAD: SELECT * FROM users WHERE username = '" + userInput + "';</p>
            <p className="text-gray-400">-- If userInput is "admin' OR '1'='1", the query becomes:</p>
            <p className="text-red-400">SELECT * FROM users WHERE username = 'admin' OR '1'='1';</p>
        </div>
                        </div>

                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <Link href="/dashboard/subjects" className="group flex flex-col items-start">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-blue-500 transition-colors">
                                    Dashboard
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-blue-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">grid_view</span>
                                    <span className="font-sans font-bold text-xl">Return Home</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>

                <FloatingActions />
            </div>
        </div>
    );
}
