import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import { dbmsModules } from "@/data/dbmsModules";
import Link from "next/link";

export default function DbmsIndexingPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 6"
                conceptTitle="B+ Tree Data Race"
                userInitials="YY"
                examMode={false}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-indexing" />

                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-blue-500 w-[100%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">speed</span> Module Complete
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                B+ Tree Data Race
                            </h1>
                        </div>

                        <div className="prose-custom text-charcoal max-w-none">
                            <p className="mb-6 text-lg leading-relaxed">Without indexes, finding a record in a 10-million row table requires a full table scan. Indexes act like the table of contents in a book.</p>
        <CalloutBox type="concept">
            <p><strong>B+ Trees:</strong> The default index structure in most databases. They remain balanced, ensuring O(log N) search times, and leaf nodes are linked for fast range queries.</p>
        </CalloutBox>
        <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">The Trade-off</h2>
        <p className="mb-6 text-lg leading-relaxed">Indexes speed up READ operations (SELECTs) but slow down WRITE operations (INSERT/UPDATE/DELETE) because the index must be updated every time data changes.</p>
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
