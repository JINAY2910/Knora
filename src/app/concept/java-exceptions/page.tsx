import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import { javaModules } from "@/data/javaModules";

export default function JavaExceptionsPage() {
    const exceptionCode = `public class ExceptionDemo {
    public static void validateAge(int age) throws IllegalArgumentException {
        if (age < 18) {
            // Unchecked Exception explicitly thrown
            throw new IllegalArgumentException("Age must be 18+");
        }
    }

    public static void main(String[] args) {
        try {
            validateAge(16);
        } catch (IllegalArgumentException e) {
            System.err.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("This executes regardless of the outcome.");
        }
    }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 7"
                conceptTitle="Exception Handling"
                userInitials="JD"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-exceptions" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[70%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 7
                                </span>
                                <span className="px-3 py-1 text-xs font-bold border border-crimson text-crimson uppercase tracking-wider bg-white">
                                    High Probability
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 16 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Exception Handling: <br />
                                <span className="text-crimson font-sans">Robust Error Recovery</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Without exception handling, runtime errors would cause programs to terminate abruptly. Java provides a robust framework to gracefully detect and recover from errors.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block">
                                1. Checked vs. Unchecked Exceptions
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                The root of the exception hierarchy is the <code>Throwable</code> class, with subgroups <code>Error</code> and <code>Exception</code>.
                            </p>

                            <div className="overflow-x-auto my-10 border-2 border-charcoal bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-charcoal uppercase bg-cream border-b-2 border-charcoal tracking-wider font-bold">
                                        <tr>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Property</th>
                                            <th className="px-6 py-4 border-r border-charcoal/20">Checked Exception</th>
                                            <th className="px-6 py-4 text-crimson">Unchecked Exception</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/20 text-base">
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Detected at</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20">Compile time</td>
                                            <td className="px-6 py-4 text-crimson">Runtime</td>
                                        </tr>
                                        <tr className="bg-crimson/5">
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Must handle?</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold text-crimson">Yes (try-catch or throws)</td>
                                            <td className="px-6 py-4 text-crimson">No (optional)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-bold">Examples</td>
                                            <td className="px-6 py-4 border-r border-charcoal/20 font-mono text-sm">IOException, SQLException</td>
                                            <td className="px-6 py-4 text-crimson font-mono text-sm">NullPointerException</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <CalloutBox type="mistake">
                                <p>
                                    <code>throw</code> is used <strong>inside</strong> a method body to explicitly throw an exception object. <code>throws</code> is used in a method <strong>signature</strong> to declare that the method may propagate exceptions up the stack!
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                2. Try-Catch-Finally Execution
                            </h2>
                            <CodeBlock language="java" filename="ExceptionDemo.java" code={exceptionCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                3. Try-With-Resources
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                Introduced in Java 7, Try-With-Resources automatically closes any resources (objects implementing <code>AutoCloseable</code>) when the try block exits, eliminating the boilerplate of manually doing it inside an explicit <code>finally</code> block.
                            </p>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <a className="group flex flex-col items-start" href="/concept/java-lambdas">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Lambdas</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-multithreading">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">Multithreading</span>
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
