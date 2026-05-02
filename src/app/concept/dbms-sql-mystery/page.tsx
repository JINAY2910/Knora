import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import { dbmsModules } from "@/data/dbmsModules";
import Link from "next/link";

export default function SqlMysteryPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 2"
                conceptTitle="SQL Murder Mystery"
                userInitials="YY"
                examMode={false}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-sql-mystery" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-charcoal text-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-black">
                        <div className="h-full bg-crimson w-[25%]"></div>
                    </div>

                    <div className="max-w-5xl mx-auto px-8 py-10">
                        {/* Title Section */}
                        <div className="mb-8 border-b-2 border-charcoal-light pb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 text-xs font-bold bg-crimson text-white uppercase tracking-wider">
                                    Detective Mode
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-yellow-500 text-yellow-500 uppercase tracking-wider">
                                    Hard
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white font-mono">
                                >_ SQL MURDER MYSTERY
                            </h1>
                            <p className="text-lg text-gray-400 font-mono">
                                A crime has taken place and the detective needs your help. The detective gave you the crime scene report, but you somehow lost it. 
                                You vaguely remember that the crime was a murder that occurred sometime on Jan.15, 2026 and that it took place in SQL City.
                            </p>
                        </div>

                        {/* Interactive IDE Area */}
                        <div className="grid grid-cols-12 gap-6 h-[500px]">
                            {/* Left Side: Schema Explorer */}
                            <div className="col-span-4 bg-black border border-charcoal-light rounded p-4 overflow-y-auto font-mono text-sm">
                                <h3 className="text-yellow-500 font-bold mb-4 uppercase">Database Schema</h3>
                                
                                <div className="mb-4">
                                    <div className="text-blue-400 font-bold flex items-center gap-2 cursor-pointer">
                                        <span className="material-symbols-outlined text-[16px]">table_rows</span> crime_scene_report
                                    </div>
                                    <div className="pl-6 text-gray-500 mt-1">
                                        <div>date <span className="text-gray-600">int</span></div>
                                        <div>type <span className="text-gray-600">text</span></div>
                                        <div>description <span className="text-gray-600">text</span></div>
                                        <div>city <span className="text-gray-600">text</span></div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-blue-400 font-bold flex items-center gap-2 cursor-pointer">
                                        <span className="material-symbols-outlined text-[16px]">table_rows</span> person
                                    </div>
                                    <div className="pl-6 text-gray-500 mt-1">
                                        <div>id <span className="text-gray-600">int (PK)</span></div>
                                        <div>name <span className="text-gray-600">text</span></div>
                                        <div>license_id <span className="text-gray-600">int</span></div>
                                        <div>address_street_name <span className="text-gray-600">text</span></div>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="text-blue-400 font-bold flex items-center gap-2 cursor-pointer">
                                        <span className="material-symbols-outlined text-[16px]">table_rows</span> interview
                                    </div>
                                    <div className="pl-6 text-gray-500 mt-1">
                                        <div>person_id <span className="text-gray-600">int (FK)</span></div>
                                        <div>transcript <span className="text-gray-600">text</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Code Editor & Results */}
                            <div className="col-span-8 flex flex-col gap-4">
                                {/* Editor */}
                                <div className="flex-1 bg-[#1e1e1e] border border-charcoal-light rounded p-4 font-mono">
                                    <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                                        <span className="text-gray-400 text-sm">Query Editor (MySQL)</span>
                                        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded text-xs font-bold uppercase">Run Query</button>
                                    </div>
                                    <textarea 
                                        className="w-full h-[150px] bg-transparent text-gray-300 outline-none resize-none"
                                        defaultValue="SELECT * FROM crime_scene_report&#10;WHERE city = 'SQL City'&#10;  AND type = 'murder'&#10;  AND date = 20260115;"
                                        spellCheck={false}
                                    />
                                </div>

                                {/* Results / Terminal */}
                                <div className="h-[200px] bg-black border border-charcoal-light rounded p-4 font-mono overflow-y-auto">
                                    <span className="text-gray-500 text-xs uppercase mb-2 block">Output Terminal</span>
                                    <table className="w-full text-left text-sm text-gray-300">
                                        <thead className="text-yellow-500 border-b border-gray-700">
                                            <tr>
                                                <th className="pb-2 pr-4">date</th>
                                                <th className="pb-2 pr-4">type</th>
                                                <th className="pb-2 pr-4">description</th>
                                                <th className="pb-2 pr-4">city</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            <tr>
                                                <td className="py-2 pr-4">20260115</td>
                                                <td className="py-2 pr-4 text-red-400">murder</td>
                                                <td className="py-2 pr-4 text-gray-400 max-w-[300px] truncate">Security footage shows there were 2 witnesses. The first witness lives at the last house on "Northwestern Dr". The second witness, named Annabel, lives somewhere on "Franklin Ave".</td>
                                                <td className="py-2 pr-4">SQL City</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-10 pt-6 border-t border-charcoal-light flex justify-between items-center">
                            <Link href="/concept/dbms-nosql" className="group flex flex-col items-start">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-hover:text-yellow-500 transition-colors">
                                    Back
                                </span>
                                <div className="flex items-center gap-2 text-white group-hover:text-yellow-500 transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">RDBMS vs NoSQL</span>
                                </div>
                            </Link>
                            
                            <Link href="/concept/dbms-relational-algebra" className="group flex flex-col items-end">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-hover:text-yellow-500 transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-white group-hover:text-yellow-500 transition-colors">
                                    <span className="font-sans font-bold text-xl">Relational Algebra</span>
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
