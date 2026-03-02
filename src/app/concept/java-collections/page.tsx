import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import { javaModules } from "@/data/javaModules";

export default function JavaCollectionsPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 10"
                conceptTitle="Collections Framework"
                userInitials="JS"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-collections" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-green-500 w-full"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 10
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 28 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Collections Framework <br />
                                <span className="text-crimson font-sans">& Generics</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                A unified architecture of interfaces and battle-tested classes for storing, organizing, and manipulating groups of objects.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block">
                                1. The Core Interfaces
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                The hierarchy starts with <code>Iterable</code>, followed by <code>Collection</code>. Underneath, there are three primary sub-interfaces. <code>Map</code> stands alone outside the Collection hierarchy.
                            </p>

                            <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
                                <li><strong>List:</strong> Ordered, allows duplicates, supports index-based access (e.g. ArrayList, LinkedList).</li>
                                <li><strong>Set:</strong> Unordered, enforces uniqueness, NO duplicates (e.g. HashSet, TreeSet).</li>
                                <li><strong>Map:</strong> Stores key-value pairings. Keys are unique, values can be duplicated (e.g. HashMap, TreeMap).</li>
                            </ul>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                2. ArrayList vs LinkedList
                            </h2>
                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Metric</th>
                                            <th className="px-6 py-4 border-r border-charcoal/20">ArrayList (Dynamic Array)</th>
                                            <th className="px-6 py-4 text-crimson">LinkedList (Doubly-Linked)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Read / Access</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 text-green-600 font-bold">Fast O(1)</td>
                                            <td className="px-6 py-4 text-crimson font-bold">Slow O(n)</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Insertions / Deletions</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 text-crimson font-bold">Slow O(n) in middle</td>
                                            <td className="px-6 py-4 text-green-600 font-bold">Fast O(1)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <CalloutBox type="mistake">
                                <p>
                                    <strong>Common Mistake:</strong> Using <code>==</code> instead of <code>.equals()</code> when comparing objects in collections! Ensure you also always override <code>hashCode()</code> when you override <code>equals()</code>!
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                3. Generics & Type Erasure
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Generics (Java 5+) provide compile-time type safety so you avoid <code>ClassCastException</code> at runtime. But because of backwards compatibility, Java performs <strong>Type Erasure</strong>, stripping out the generic types (e.g., <code>&lt;String&gt;</code>) when creating the runtime bytecode!
                            </p>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <a className="group flex flex-col items-start" href="/concept/java-nio">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">File NIO</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-green-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-green-600 transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Course Finished!
                            </button>
                            <div className="w-32 invisible"></div>
                        </div>
                    </div>
                </main>

                <FloatingActions />
            </div>
        </div>
    );
}
