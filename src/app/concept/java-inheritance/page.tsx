import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import ConceptFigure from "@/components/concept/ConceptFigure";
import { javaModules } from "@/data/javaModules";

export default function JavaInheritancePage() {
    const inheritanceCode = `// 1. Interface
interface Drawable {
    void draw(); // implicitly public abstract
}

// 2. Abstract Class
abstract class Shape {
    String color;
    abstract double area();
}

// 3. Concrete Subclass (Inheritance + Implementation)
class Circle extends Shape implements Drawable {
    double radius;
    
    Circle(double r) { this.radius = r; }
    
    @Override
    double area() { return Math.PI * radius * radius; }
    
    @Override
    public void draw() { System.out.println("Drawing Circle"); }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 5"
                conceptTitle="Inheritance & Interfaces"
                userInitials="JD"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-inheritance" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[55%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 5
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 22 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Inheritance, Interfaces <br />
                                <span className="text-crimson font-sans">& Packages</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Inheritance is a pillar of OOP establishing an "is-a" relationship, enabling code reuse. Interfaces define contracts that multiple unrelated classes can implement.
                            </p>
                        </div>

                        {/* Figure */}
                        <ConceptFigure figureNumber="FIG 5.1" caption="Diamond Problem & Interfaces">
                            <div className="z-10 text-center transform group-hover:scale-105 transition-transform duration-700 py-12">
                                <span className="material-symbols-outlined text-8xl text-charcoal group-hover:text-crimson transition-colors duration-500">
                                    account_tree
                                </span>
                                <p className="mt-4 text-base text-charcoal font-bold font-mono tracking-tighter uppercase">
                                    Class Hierarchies
                                </p>
                            </div>
                        </ConceptFigure>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block" id="forms">
                                1. Forms of Inheritance
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A subclass inherits from a superclass using the <code>extends</code> keyword. It inherits all non-private members. Constructors are not inherited, but can be invoked via <code>super()</code>.
                            </p>

                            <ul className="list-disc pl-6 mb-8 text-lg space-y-3">
                                <li><strong>Single:</strong> Subclass inherits from one superclass.</li>
                                <li><strong>Multilevel:</strong> A subclass is superclass to another (A→B→C).</li>
                                <li><strong>Hierarchical:</strong> Multiple subclasses inherit from one base.</li>
                            </ul>

                            <CalloutBox type="mistake">
                                <p>
                                    Java does NOT support <strong>Multiple Inheritance</strong> for classes to avoid the Diamond Problem. One class can extend only ONE superclass. However, it can implement MULTIPLE interfaces.
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="overriding">
                                2. Method Overriding & Dynamic Dispatch
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Method overriding occurs when a subclass defines an instance method with the exact same signature as its superclass. This achieves <strong>runtime polymorphism</strong> (dynamic method dispatch), where the JVM decides which method to call at runtime based on the actual object type.
                            </p>

                            <CodeBlock language="java" filename="Inheritance.java" code={inheritanceCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="abstract">
                                3. Abstract Classes vs. Interfaces
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                One of the most popular comparison questions in university exams:
                            </p>

                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Feature</th>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Abstract Class</th>
                                            <th className="px-6 py-4 text-crimson">Interface</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Methods</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Abstract OR concrete methods</td>
                                            <td className="px-6 py-4 text-crimson">Abstract (Java 8 allows <code>default</code>/<code>static</code>)</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Fields</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Can have instance variables</td>
                                            <td className="px-6 py-4 text-crimson">Only <code>public static final</code> constants</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Multiple Inheritance</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">No (single extends)</td>
                                            <td className="px-6 py-4 text-crimson">Yes (multiple implements)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <CalloutBox type="concept">
                                <p>
                                    Use abstract classes when you want to share code among closely related classes. Use interfaces when you want to define a contract for unrelated classes.
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block" id="exam">
                                4. Exam Context (University Questions)
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
                                            Interfaces vs Abstracts
                                        </h4>
                                        <p className="text-lg text-gray-300 font-sans mb-6 leading-relaxed border-l-2 border-crimson pl-4">
                                            "Differentiate between Abstract Classes and Interfaces. Why does Java prefer interfaces for multiple inheritance over classes?"
                                        </p>
                                        <a className="inline-flex items-center group/link" href="#">
                                            <span className="text-white group-hover/link:text-crimson transition-colors font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-white pb-1 group-hover/link:border-crimson">
                                                View Solution{" "}
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
                            <a className="group flex flex-col items-start" href="/concept/java-strings">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">String Handling</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/dashboard/subjects">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next Concept
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">Dashboard</span>
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
