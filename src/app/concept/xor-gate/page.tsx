import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import ConceptFigure from "@/components/concept/ConceptFigure";

export default function CppPointersPage() {
    const sections = [
        { id: "introduction", title: "1. Introduction to Pointers", href: "#introduction" },
        { id: "memory", title: "2. The Memory Model", href: "#memory" },
        { id: "implementation", title: "3. Pointer Operations", href: "#implementation" },
        { id: "pyq", title: "4. Common Applications", href: "#pyq" },
        { id: "exam", title: "5. Interview Questions", href: "#exam" },
    ];

    const cppCode = `#include <iostream>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before swap: x=" << x << " y=" << y << "\\n";
    swap(&x, &y);
    std::cout << "After swap: x=" << x << " y=" << y << "\\n";
    return 0;
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="C++ Programming"
                topic="Memory Management"
                conceptTitle="Pointers Deep Dive"
                userInitials="JS"
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
                                Understanding C++ Pointers: <br />
                                <span className="text-crimson font-sans">Memory & Manipulation</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                A pointer is a variable that stores the memory address of another variable. They are fundamental for dynamic memory allocation and efficient array/string manipulation in C++.
                            </p>
                        </div>

                        {/* Figure */}
                        <ConceptFigure figureNumber="FIG 1.1" caption="Pointer Reference Model">
                            <div className="z-10 text-center transform group-hover:scale-105 transition-transform duration-700">
                                <span className="material-symbols-outlined text-8xl text-charcoal group-hover:text-crimson transition-colors duration-500">
                                    memory
                                </span>
                                <p className="mt-4 text-base text-charcoal font-bold font-mono tracking-tighter uppercase">
                                    Memory Architecture
                                </p>
                            </div>
                        </ConceptFigure>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block" id="introduction">
                                1. Introduction to Pointers
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Every variable you declare in C++ is stored in memory, and this memory location has a distinct address. A pointer is simply a dedicated variable that holds this exact memory address.
                            </p>

                            <CalloutBox type="concept">
                                <p>
                                    To access the memory address of a variable, use the <strong className="text-crimson font-bold bg-crimson/10 px-1">& (address-of)</strong> operator. To access the value at the address a pointer holds, use the <strong className="text-crimson font-bold bg-crimson/10 px-1">* (dereference)</strong> operator.
                                </p>
                            </CalloutBox>

                            <p className="mb-6 text-lg leading-relaxed">
                                By directly interacting with memory, C++ allows you to optimize performance and construct complex data structures like linked lists and trees.
                            </p>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="memory">
                                2. The Memory Model
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Let's visualize how pointers look in memory. Assume integer `x` is stored at address `0x1000`.
                            </p>

                            {/* Memory Table */}
                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-8 py-4 border-r border-charcoal/20">Variable</th>
                                            <th className="px-8 py-4 border-r border-charcoal/20">Memory Address</th>
                                            <th className="px-8 py-4 text-crimson">Stored Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 font-mono text-base">
                                        <tr>
                                            <td className="px-8 py-4 border-r border-charcoal/20">int x = 5;</td>
                                            <td className="px-8 py-4 border-r border-charcoal/20">0x1000</td>
                                            <td className="px-8 py-4 text-charcoal-light">5</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-8 py-4 border-r border-charcoal/20">int* ptr = &x;</td>
                                            <td className="px-8 py-4 border-r border-charcoal/20">0x2000</td>
                                            <td className="px-8 py-4 font-bold text-crimson">0x1000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <CalloutBox type="mistake">
                                <p>
                                    Students often forget to initialize pointers. An uninitialized pointer (wild pointer) points to an arbitrary memory location, which can cause segmentation faults if dereferenced!
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="implementation">
                                3. Code Implementation
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A classic example of pointer utility is passing by reference to manipulate original variables within a function, as seen in this swap snippet:
                            </p>

                            <CodeBlock language="cpp" filename="pointer_swap.cpp" code={cppCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="pyq">
                                4. Exam Context (Interview Question)
                            </h2>

                            <CalloutBox type="exam">
                                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                                    <div className="shrink-0">
                                        <span className="inline-block px-3 py-1 bg-crimson text-white text-[11px] font-bold uppercase tracking-widest border border-white">
                                            Google L4
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-sans font-bold text-2xl mb-3 text-white">
                                            Memory Leaks & Pointers
                                        </h4>
                                        <p className="text-lg text-gray-300 font-sans mb-6 leading-relaxed border-l-2 border-crimson pl-4">
                                            "Explain how a memory leak occurs when using raw pointers and how std::unique_ptr prevents it."
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
