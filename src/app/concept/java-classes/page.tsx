import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import ConceptFigure from "@/components/concept/ConceptFigure";
import { javaModules } from "@/data/javaModules";

export default function JavaClassesPage() {
    const constructorCode = `public class Student {
    private int id;
    private String name;

    // 1. Default Constructor
    public Student() { 
        this.id = 0;
        this.name = "Unknown";
    }

    // 2. Parameterized Constructor
    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // 3. Overloaded Constructor (Constructor chaining using 'this()')
    public Student(int id) {
        this(id, "Unknown");
    }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 3"
                conceptTitle="Class Fundamentals"
                userInitials="JS"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-classes" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[30%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 3
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 18 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Class Fundamentals: <br />
                                <span className="text-crimson font-sans">Constructors & Lifecycles</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                A class is the fundamental unit of object-oriented programming in Java. It serves as the template or blueprint from which objects are created and states are managed.
                            </p>
                        </div>

                        {/* Figure */}
                        <ConceptFigure figureNumber="FIG 3.1" caption="Classes and Objects in Memory">
                            <div className="z-10 group-hover:scale-[1.02] transition-transform duration-700 w-full flex justify-center py-6">
                                <img
                                    src="/images/concepts/java_classes_memory.png"
                                    alt="Class Instantiation Diagram"
                                    className="w-full max-w-2xl h-auto rounded-xl shadow-lg border-2 border-charcoal/10"
                                />
                            </div>
                        </ConceptFigure>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block" id="anatomy">
                                1. Anatomy of a Class
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Every Java program must have at least one class. A class declaration contains fields (data members), constructors, and methods. Inside, you can manage the state and map out the behavior.
                            </p>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="constructors">
                                2. Constructors & Overloading
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A constructor is a special method automatically invoked when an object is created using the <code>new</code> keyword to initialize state. <strong>Constructors must have the same name as the class and have no return type.</strong>
                            </p>

                            <CodeBlock language="java" filename="Student.java" code={constructorCode} />

                            <CalloutBox type="mistake">
                                <p>
                                    Common Exam Mistake: Giving a return type to a constructor (e.g. <code>public void Student()</code>). This turns it into a regular method, NOT a constructor!
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="keywords">
                                3. The 'this', 'static', and 'final' Keywords
                            </h2>
                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Keyword</th>
                                            <th className="px-6 py-4 text-crimson">Usage & Behavior</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">this</td>
                                            <td className="px-6 py-4">Refers to the current object. Used to resolve naming ambiguity between fields and parameters, or for constructor chaining (<code>this()</code>).</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">static</td>
                                            <td className="px-6 py-4">Creates a class-level member shared by all instances. A static method cannot use <code>this</code> or <code>super</code>.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">final</td>
                                            <td className="px-6 py-4">Variables cannot change value. Methods cannot be overridden. Classes cannot be subclassed.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="initialization">
                                4. Order of Execution
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                When a class is loaded and an object is instantiated, the JVM follows a strict initialization order:
                            </p>
                            <ol className="list-decimal pl-6 mb-8 text-lg font-bold space-y-2 text-crimson">
                                <li>Static blocks (Executed EXACTLY ONCE when class is loaded)</li>
                                <li>Instance Initializer blocks (Executed BEFORE constructor on every object creation)</li>
                                <li>Constructors (Executed on every object creation)</li>
                            </ol>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="garbage-collection">
                                5. Garbage Collection
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Java manages memory automatically. The JVM periodically identifies objects in the heap that are no longer referenced. An object becomes eligible for GC when its reference is set to null, pointing to another object, or goes out of scope.
                            </p>

                            <CalloutBox type="concept">
                                <p>
                                    You can suggest GC using <code>System.gc()</code>, but it does NOT guarantee immediate collection. Memory deallocation is non-deterministic.
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="exam">
                                6. Exam Context (University Questions)
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
                                            Constructors & Statics
                                        </h4>
                                        <p className="text-lg text-gray-300 font-sans mb-6 leading-relaxed border-l-2 border-crimson pl-4">
                                            "Explain static variables, static methods, and static blocks with examples. Describe the order of execution of static and instance initializer blocks and constructors."
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
                            <a className="group flex flex-col items-start" href="/concept/java-intro">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Intro to Java</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-strings">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">String Handling</span>
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
