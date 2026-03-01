import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import { javaModules } from "@/data/javaModules";

export default function JavaLambdasPage() {
    const lambdaCode = `import java.util.function.*;

public class LambdaTest {
    public static void main(String[] args) {
        // 1. Predicate: Test a condition
        Predicate<Integer> isAdult = age -> age >= 18;
        System.out.println(isAdult.test(20)); // true

        // 2. Function: Transform data (String to Integer length)
        Function<String, Integer> stringLength = s -> s.length();
        System.out.println(stringLength.apply("Java 8")); // 6

        // 3. Consumer: Perform an action
        Consumer<String> greeter = name -> System.out.println("Hello, " + name);
        greeter.accept("Alice");
    }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 6"
                conceptTitle="Functional Interfaces"
                userInitials="JD"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-lambdas" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[60%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 6
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 18 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Functional Interfaces & <br />
                                <span className="text-crimson font-sans">Lambda Expressions</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Java 8 introduced functional programming capabilities, allowing developers to treat behavior (functions) as data.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block">
                                1. Functional Interfaces
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A <strong>functional interface</strong> is an interface that contains exactly <em>one</em> abstract method. It may have any number of default or static methods. It serves as the target type for lambda expressions.
                            </p>

                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Interface</th>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Method Signature</th>
                                            <th className="px-6 py-4 text-crimson">Purpose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">Predicate&lt;T&gt;</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-mono text-sm">boolean test(T t)</td>
                                            <td className="px-6 py-4 text-charcoal">Test a condition (returns true/false).</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">Function&lt;T, R&gt;</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-mono text-sm">R apply(T t)</td>
                                            <td className="px-6 py-4 text-charcoal">Transform/map one type to another.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">Consumer&lt;T&gt;</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-mono text-sm">void accept(T t)</td>
                                            <td className="px-6 py-4 text-charcoal">Perform an action; no return value.</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold font-mono">Supplier&lt;T&gt;</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-mono text-sm">T get()</td>
                                            <td className="px-6 py-4 text-charcoal">Supply a value; takes no arguments.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                2. Lambda Expressions Syntax
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A lambda expression essentially provides a concise implementation of the single abstract method.
                            </p>

                            <CodeBlock language="java" filename="LambdaTest.java" code={lambdaCode} />

                            <CalloutBox type="concept">
                                <p>
                                    <strong>Java 17+ Sealed Interfaces:</strong> A sealed interface restricts which classes may implement it using the <code>permits</code> clause, enabling exhaustive pattern matching.
                                </p>
                            </CalloutBox>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <a className="group flex flex-col items-start" href="/concept/java-inheritance">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Inheritance</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-exceptions">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">Exceptions</span>
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
