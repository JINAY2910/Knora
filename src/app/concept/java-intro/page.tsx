import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import ConceptFigure from "@/components/concept/ConceptFigure";
import { javaModules } from "@/data/javaModules";

export default function JavaIntroPage() {
    const javaCode = `public class HelloWorld {
    // Execution starts here
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 1 & 2"
                conceptTitle="Introduction to Java"
                userInitials="JS"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-intro" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[20%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 2
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 15 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Introduction to Java: <br />
                                <span className="text-crimson font-sans">Architecture & OOP</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Java is a platform-independent, object-oriented programming language designed on the principle of "Write Once, Run Anywhere".
                            </p>
                        </div>

                        {/* Figure */}
                        <ConceptFigure figureNumber="FIG 2.1" caption="Java Virtual Machine (JVM) Architecture">
                            <div className="z-10 group-hover:scale-[1.02] transition-transform duration-700 w-full flex justify-center">
                                <img
                                    src="/images/concepts/jvm_architecture.png"
                                    alt="JVM Architecture Diagram"
                                    className="w-full max-w-2xl h-auto rounded-xl shadow-lg border-2 border-charcoal/10"
                                />
                            </div>
                        </ConceptFigure>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block" id="introduction">
                                1. Procedural vs. Object-Oriented Programming
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                In <strong>procedural programming</strong>, a program is divided into functions or procedures. Data flows between these functions, and there is no strict encapsulation.
                                In contrast, <strong>Object-Oriented Programming (OOP)</strong> structures a program around objects — self-contained units that bundle data (attributes) and behaviour (methods) together.
                            </p>

                            <CalloutBox type="concept">
                                <p>
                                    An <strong>object</strong> is an instance of a <strong>class</strong>, and a class acts as a blueprint. For example, 'Apple' is an object that is-a 'Fruit' (the class).
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="oop-features">
                                2. Features of OOP
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                High Exam Probability Topic: These features are frequently tested as definition or comparison questions.
                            </p>

                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-8 py-4 border-r border-charcoal/20">Feature</th>
                                            <th className="px-8 py-4 text-crimson">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-8 py-4 border-r border-charcoal/20 font-bold">Encapsulation</td>
                                            <td className="px-8 py-4">Bundling data and methods within a class; controls access via access modifiers.</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-8 py-4 border-r border-charcoal/20 font-bold">Data Abstraction</td>
                                            <td className="px-8 py-4">Exposing only essential information while hiding implementation details.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-8 py-4 border-r border-charcoal/20 font-bold">Inheritance</td>
                                            <td className="px-8 py-4">Deriving new classes from existing ones to enable code reuse.</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-8 py-4 border-r border-charcoal/20 font-bold">Polymorphism</td>
                                            <td className="px-8 py-4">Ability of a method or object to take multiple forms (compile-time & runtime).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="architecture">
                                3. Java Components: JVM, JRE, and JDK
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Understanding the three-layer Java platform architecture is essential for any Java developer:
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-lg space-y-3">
                                <li><strong>JVM (Java Virtual Machine):</strong> The core engine that executes Java bytecode. It is platform-specific, performing bytecode verification, memory management, and execution.</li>
                                <li><strong>JRE (Java Runtime Environment):</strong> Packages the JVM together with standard Java class libraries designed to run Java applications.</li>
                                <li><strong>JDK (Java Development Kit):</strong> The full development package. It contains the JRE plus the compiler <code>javac</code>, and other development tools.</li>
                            </ul>

                            <CalloutBox type="mistake">
                                <p>
                                    Students often confuse the three! Remember: <strong>JDK contains JRE, and JRE contains JVM.</strong> If you just want to run a program, you need JRE. To write one, you need JDK.
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="lifecycle">
                                4. Java Program Lifecycle & Code
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                The lifecycle starts with the programmer writing source code (<code>.java</code>). The <code>javac</code> compiler translates it into platform-neutral bytecode (<code>.class</code>). At runtime, the JVM's Class Loader loads it, and the Execution Engine runs it.
                            </p>

                            <CodeBlock language="java" filename="HelloWorld.java" code={javaCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="exam">
                                5. Exam Context (University Questions)
                            </h2>

                            <CalloutBox type="exam">
                                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                                    <div className="shrink-0">
                                        <span className="inline-block px-3 py-1 bg-crimson text-white text-[11px] font-bold uppercase tracking-widest border border-white">
                                            5 Marks
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-sans font-bold text-2xl mb-3 text-white">
                                            Java Characteristics & WORA
                                        </h4>
                                        <p className="text-lg text-gray-300 font-sans mb-6 leading-relaxed border-l-2 border-crimson pl-4">
                                            "Explain any five characteristics of Java that make it suitable for enterprise application development. Also explain what WORA means."
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
                            <a className="group flex flex-col items-start" href="/dashboard/subjects">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Back
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Dashboard</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-classes">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">Class Fundamentals</span>
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
