import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import ConceptFigure from "@/components/concept/ConceptFigure";

export default function XORGatePage() {
    const sections = [
        { id: "introduction", title: "1. Introduction to XOR", href: "#introduction" },
        { id: "truth-table", title: "2. Truth Table Analysis", href: "#truth-table" },
        { id: "implementation", title: "3. Circuit Implementation", href: "#implementation" },
        { id: "pyq", title: "4. Common Applications", href: "#pyq" },
        { id: "exam", title: "5. PYQ References", href: "#exam" },
    ];

    const pythonCode = `def xor_gate(a, b):
    # The ^ operator is the bitwise XOR in Python
    return a ^ b

# Test Cases
print(f"0 XOR 0 = {xor_gate(0, 0)}")  # Output: 0
print(f"0 XOR 1 = {xor_gate(0, 1)}")  # Output: 1`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Digital Logic"
                topic="Logic Gates"
                conceptTitle="XOR Gate Deep Dive"
                userInitials="JD"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={sections} activeSection="introduction" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[35%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Topic 4.2
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 12 min
                                    read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Understanding the XOR Gate: <br />
                                <span className="text-crimson font-sans">Logic & Applications</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                The Exclusive-OR (XOR) gate is a digital logic gate that gives a true output when the
                                number of true inputs is odd. It is fundamental to arithmetic circuits.
                            </p>
                        </div>

                        {/* Figure */}
                        <ConceptFigure figureNumber="FIG 1.1" caption="Standard Symbol for XOR Gate">
                            <div className="z-10 text-center transform group-hover:scale-105 transition-transform duration-700">
                                <span className="material-symbols-outlined text-8xl text-charcoal group-hover:text-crimson transition-colors duration-500">
                                    settings_input_component
                                </span>
                                <p className="mt-4 text-base text-charcoal font-bold font-mono tracking-tighter uppercase">
                                    XOR Logic Diagram
                                </p>
                            </div>
                        </ConceptFigure>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block" id="introduction">
                                1. Introduction to XOR
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                The XOR gate (short for Exclusive OR) differs from the standard OR gate in a critical
                                way. While an OR gate outputs true if <em>at least one</em> input is true, the XOR gate
                                requires strict exclusivity.
                            </p>

                            <CalloutBox type="concept">
                                <p>
                                    The output is HIGH (1) only if the inputs are{" "}
                                    <strong className="text-crimson font-bold bg-crimson/10 px-1">different</strong>. If
                                    both inputs are the same (both 0 or both 1), the output is LOW (0). This property
                                    makes it an ideal "inequality detector."
                                </p>
                            </CalloutBox>

                            <p className="mb-6 text-lg leading-relaxed">
                                Mathematically, the XOR operation is represented by the symbol{" "}
                                <span className="font-mono text-crimson text-xl font-bold bg-white px-1 border border-charcoal/20">
                                    ⊕
                                </span>
                                . So for inputs A and B, the expression is:
                            </p>

                            <div className="bg-charcoal border-2 border-charcoal p-6 font-mono text-center text-xl text-white my-8 shadow-[6px_6px_0px_0px_rgba(250,39,66,1)]">
                                Q = A ⊕ B = (A' · B) + (A · B')
                            </div>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="truth-table">
                                2. Truth Table Analysis
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Let's break down the logic states. Notice the pattern in rows 2 and 3 versus rows 1 and
                                4.
                            </p>

                            {/* Truth Table */}
                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-8 py-4 border-r border-charcoal/20">Input A</th>
                                            <th className="px-8 py-4 border-r border-charcoal/20">Input B</th>
                                            <th className="px-8 py-4 text-crimson">Output Q (A ⊕ B)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 font-mono text-base">
                                        <tr>
                                            <td className="px-8 py-4 border-r border-charcoal/20">0</td>
                                            <td className="px-8 py-4 border-r border-charcoal/20">0</td>
                                            <td className="px-8 py-4 text-charcoal-light">0</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-8 py-4 border-r border-charcoal/20">0</td>
                                            <td className="px-8 py-4 border-r border-charcoal/20">1</td>
                                            <td className="px-8 py-4 font-bold text-crimson">1</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-8 py-4 border-r border-charcoal/20">1</td>
                                            <td className="px-8 py-4 border-r border-charcoal/20">0</td>
                                            <td className="px-8 py-4 font-bold text-crimson">1</td>
                                        </tr>
                                        <tr>
                                            <td className="px-8 py-4 border-r border-charcoal/20">1</td>
                                            <td className="px-8 py-4 border-r border-charcoal/20">1</td>
                                            <td className="px-8 py-4 text-charcoal-light">0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <CalloutBox type="mistake">
                                <p>
                                    Students often confuse XOR with OR when inputs are both 1. Remember: Standard OR
                                    gives 1 (True) for inputs (1,1), but XOR gives 0 (False).
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="implementation">
                                3. Code Implementation
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Here is how you might implement an XOR check in Python. This is commonly used in bitwise
                                operations for encryption or simple checksums.
                            </p>

                            <CodeBlock language="python" filename="python_xor_example.py" code={pythonCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="pyq">
                                4. Exam Context (PYQ)
                            </h2>

                            <CalloutBox type="exam">
                                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                                    <div className="shrink-0">
                                        <span className="inline-block px-3 py-1 bg-crimson text-white text-[11px] font-bold uppercase tracking-widest border border-white">
                                            Exam 2022
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-sans font-bold text-2xl mb-3 text-white">
                                            Semester 4 - Digital Electronics (Q3a)
                                        </h4>
                                        <p className="text-lg text-gray-300 font-sans mb-6 leading-relaxed border-l-2 border-crimson pl-4">
                                            "Explain why the XOR gate is referred to as a controlled inverter using a
                                            timing diagram."
                                        </p>
                                        <a className="inline-flex items-center group/link" href="#">
                                            <span className="text-white group-hover/link:text-crimson transition-colors font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-white pb-1 group-hover/link:border-crimson">
                                                View Full Solution{" "}
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
                            <a className="group flex flex-col items-start" href="#">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">OR Gate Logic</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="#">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">NAND Gate Logic</span>
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
