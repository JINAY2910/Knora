import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import ConceptFigure from "@/components/concept/ConceptFigure";
import { javaModules } from "@/data/javaModules";

export default function JavaStringsPage() {
    const builderCode = `public class StringTest {
    public static void main(String[] args) {
        // String (Immutable, creates multiple objects in pool)
        String s = "Hello";
        s = s + " World"; 
        
        // StringBuilder (Mutable, faster, NOT thread-safe)
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        
        // StringBuffer (Mutable, slower, thread-safe)
        StringBuffer sbf = new StringBuffer("Hello");
        sbf.append(" World");
    }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 4"
                conceptTitle="String Handling"
                userInitials="JD"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-strings" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[42%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 4
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 14 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                String Handling: <br />
                                <span className="text-crimson font-sans">Immutability & Builders</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Strings are among the most frequently used data types. In Java, a String is an object that represents an immutable sequence of characters.
                            </p>
                        </div>

                        {/* Figure Placeholder */}
                        <ConceptFigure figureNumber="FIG 4.1" caption="String Constant Pool Architecture">
                            <div className="z-10 group-hover:scale-[1.02] transition-transform duration-700 w-full flex justify-center py-6">
                                <img
                                    src="/images/concepts/string_pool.png"
                                    alt="String Pool vs Heap"
                                    className="w-full max-w-2xl h-auto rounded-xl shadow-lg border-2 border-charcoal/10"
                                />
                            </div>
                        </ConceptFigure>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block" id="immutability">
                                1. String Immutability
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                The most important characteristic of the String class is its <strong>immutability</strong>. Once a String object is created, its content cannot be modified. Any operation that appears to modify a string actually creates a new String object in the <em>String Constant Pool</em> or Heap Memory.
                            </p>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="methods">
                                2. Common String Methods
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                                <div className="border border-charcoal p-4 bg-white relative">
                                    <span className="absolute -top-3 left-4 bg-cream px-2 font-mono text-sm font-bold text-crimson">length()</span>
                                    <p className="mt-2 text-charcoal-light">Returns the number of characters.</p>
                                    <code className="text-sm bg-charcoal/5 px-2 py-1">"Hi".length() → 2</code>
                                </div>
                                <div className="border border-charcoal p-4 bg-white relative">
                                    <span className="absolute -top-3 left-4 bg-cream px-2 font-mono text-sm font-bold text-crimson">charAt(i)</span>
                                    <p className="mt-2 text-charcoal-light">Returns the character at index i.</p>
                                    <code className="text-sm bg-charcoal/5 px-2 py-1">"Hi".charAt(1) → 'i'</code>
                                </div>
                                <div className="border border-charcoal p-4 bg-white relative">
                                    <span className="absolute -top-3 left-4 bg-cream px-2 font-mono text-sm font-bold text-crimson">equals(s)</span>
                                    <p className="mt-2 text-charcoal-light">Compares content (case-sensitive).</p>
                                    <code className="text-sm bg-charcoal/5 px-2 py-1">"a".equals("a") → true</code>
                                </div>
                                <div className="border border-charcoal p-4 bg-white relative">
                                    <span className="absolute -top-3 left-4 bg-cream px-2 font-mono text-sm font-bold text-crimson">substring(s, e)</span>
                                    <p className="mt-2 text-charcoal-light">Extracts part of the string.</p>
                                    <code className="text-sm bg-charcoal/5 px-2 py-1">"abcd".substring(1,3) → "bc"</code>
                                </div>
                            </div>

                            <CalloutBox type="mistake">
                                <p>
                                    Never use <code>==</code> to compare strings for equality! <code>==</code> compares memory references (addresses), while <code>.equals()</code> compares the actual content.
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="builders">
                                3. StringBuffer vs. StringBuilder
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Because Strings are immutable, frequent concatenation in loops can severely degrade performance. To solve this, Java provides two mutable string alternatives:
                            </p>

                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Feature</th>
                                            <th className="px-6 py-4 border-r border-charcoal/20">String</th>
                                            <th className="px-6 py-4 border-r border-charcoal/20">StringBuffer</th>
                                            <th className="px-6 py-4">StringBuilder</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Mutability</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Immutable</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Mutable</td>
                                            <td className="px-6 py-4 text-crimson font-bold">Mutable</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Thread Safety</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Thread-safe</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Thread-safe (Synchronized)</td>
                                            <td className="px-6 py-4 text-crimson font-bold">Not thread-safe</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Performance</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Slowest</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Moderate</td>
                                            <td className="px-6 py-4 text-crimson font-bold">Fastest</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <CodeBlock language="java" filename="StringBuilders.java" code={builderCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="regex">
                                4. Regular Expressions & Tokenization
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Regular expressions (Regex) are patterns used for matching sequences in strings. Java provides the <code>java.util.regex</code> package. A string can be easily tokenized (split into parts) using <code>String.split(regex)</code>.
                            </p>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="exam">
                                5. Exam Context (University Questions)
                            </h2>

                            <CalloutBox type="exam">
                                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                                    <div className="shrink-0">
                                        <span className="inline-block px-3 py-1 bg-crimson text-white text-[11px] font-bold uppercase tracking-widest border border-white">
                                            10 Marks
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-sans font-bold text-2xl mb-3 text-white">
                                            String Classes Comparison
                                        </h4>
                                        <p className="text-lg text-gray-300 font-sans mb-6 leading-relaxed border-l-2 border-crimson pl-4">
                                            "Compare String, StringBuffer, and StringBuilder with code examples. Discuss use cases and performance considerations."
                                        </p>
                                        <a className="inline-flex items-center group/link" href="#">
                                            <span className="text-white group-hover/link:text-crimson transition-colors font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-white pb-1 group-hover/link:border-crimson">
                                                View Discussion{" "}
                                                <span className="material-symbols-outlined text-[16px]">
                                                    arrow_forward
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </CalloutBox>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <a className="group flex flex-col items-start" href="/concept/java-classes">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Class Fundamentals</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-inheritance">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">Inheritance & Packages</span>
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </main>

                <FloatingActions />
            </div>
        </div>
    );
}
