"use client";
import { useState } from "react";
import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import { dbmsModules } from "@/data/dbmsModules";
import Link from "next/link";
import ERSandbox from "@/components/concept/ERSandbox";

export default function DbmsIntroPage() {
    const [isSandboxActive, setIsSandboxActive] = useState(false);

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 1"
                conceptTitle="The Startup Architect"
                userInitials="YY"
                examMode={false}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-intro" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-blue-500 w-[5%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Interactive Sandbox
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-blue-500 text-blue-500 uppercase tracking-wider bg-white">
                                    ER Diagraming
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">extension</span> Hands-on
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                The Startup Architect: <br />
                                <span className="text-blue-600 font-sans">Designing the Uber Database</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Welcome to your first day as the Lead Data Architect for a new ride-sharing startup. 
                                Your job is to design the Entity-Relationship (ER) model before we write a single line of code.
                            </p>
                        </div>

                        {/* Interactive Sandbox Placeholder Area */}
                        {!isSandboxActive ? (
                            <div className="w-full bg-white border-2 border-charcoal rounded-xl shadow-[8px_8px_0px_0px_rgba(55,56,51,1)] overflow-hidden mb-12 flex flex-col">
                                <div className="bg-charcoal text-white px-6 py-4 flex justify-between items-center border-b-2 border-charcoal">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-blue-400">architecture</span>
                                        <h3 className="font-bold text-lg tracking-wide uppercase">Architect Sandbox V1.0</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                </div>
                                
                                <div className="p-10 flex flex-col items-center justify-center min-h-[400px] bg-slate-50 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                                    
                                    {/* Mock Entity Blocks */}
                                    <div className="absolute top-10 left-20 w-32 bg-white border-2 border-charcoal p-2 shadow-sm rounded opacity-50 blur-[1px]">
                                        <div className="bg-blue-100 font-bold text-center border-b-2 border-charcoal pb-1 mb-2">Driver</div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between"><span>PK</span><span className="font-mono">DriverID</span></div>
                                            <div className="flex justify-between"><span></span><span className="font-mono">Name</span></div>
                                        </div>
                                    </div>

                                    <div className="absolute top-10 right-20 w-32 bg-white border-2 border-charcoal p-2 shadow-sm rounded opacity-50 blur-[1px]">
                                        <div className="bg-green-100 font-bold text-center border-b-2 border-charcoal pb-1 mb-2">Rider</div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between"><span>PK</span><span className="font-mono">RiderID</span></div>
                                            <div className="flex justify-between"><span></span><span className="font-mono">Email</span></div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 bg-white border-2 border-charcoal p-2 shadow-sm rounded opacity-50 blur-[1px]">
                                        <div className="bg-purple-100 font-bold text-center border-b-2 border-charcoal pb-1 mb-2">Trip</div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between"><span>PK</span><span className="font-mono">TripID</span></div>
                                            <div className="flex justify-between text-blue-600"><span>FK</span><span className="font-mono">DriverID</span></div>
                                            <div className="flex justify-between text-green-600"><span>FK</span><span className="font-mono">RiderID</span></div>
                                        </div>
                                    </div>

                                    <div className="z-10 mt-2 text-center bg-white/95 p-6 rounded-lg shadow-xl border-2 border-charcoal">
                                        <p className="text-charcoal font-bold mb-4 text-xl">Ready to build the database schema?</p>
                                        <button 
                                            onClick={() => setIsSandboxActive(true)}
                                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(55,56,51,1)] transition-all"
                                        >
                                            Launch Sandbox Mode
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ERSandbox />
                        )}

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block">
                                The Problem Statement
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A single trip involves a <strong>Driver</strong> and a <strong>Rider</strong>. But how do we store this data efficiently? 
                                If we put everything in one massive table, we get data duplication. If we split it up incorrectly, the system crashes when millions of people request rides at 5:00 PM.
                            </p>

                            <CalloutBox type="concept">
                                <p>
                                    <strong>Entities</strong> are objects that exist independently (like a Driver or a Rider). <br/>
                                    <strong>Relationships</strong> define how these entities interact. A single Driver can have <em>many</em> Trips. This is called a <strong>One-to-Many (1:N)</strong> relationship.
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                Your First Challenge
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                In the sandbox above, you need to connect the entities using the correct Cardinality (1:1, 1:N, N:M). 
                            </p>
                            
                            <CalloutBox type="mistake">
                                <p>
                                    <strong>Watch out!</strong> If you try to create a Many-to-Many (N:M) relationship directly between Driver and Rider without using a "Trip" junction table, the simulation will fail the load test!
                                </p>
                            </CalloutBox>

                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <Link href="/dashboard/subjects" className="group flex flex-col items-start">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-blue-500 transition-colors">
                                    Back
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-blue-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Dashboard</span>
                                </div>
                            </Link>
                            
                            <Link href="/concept/dbms-nosql" className="group flex flex-col items-end">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-blue-500 transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-blue-500 transition-colors">
                                    <span className="font-sans font-bold text-xl">RDBMS vs NoSQL</span>
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
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
