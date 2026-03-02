import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import CodeBlock from "@/components/concept/CodeBlock";
import { javaModules } from "@/data/javaModules";

export default function JavaMultithreadingPage() {
    const threadCode = `class MyTask implements Runnable {
    public void run() {
        System.out.println(Thread.currentThread().getName() + " running");
    }
}

public class Main {
    public static void main(String[] args) {
        // Preferred method using Runnable
        Thread t1 = new Thread(new MyTask());
        t1.start(); // JVM internally calls run()
        
        // Cannot call t1.start() twice!
    }
}`;

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 8"
                conceptTitle="Multithreaded Programming"
                userInitials="JS"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-multithreading" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[80%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 8
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 22 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                Multithreaded <br />
                                <span className="text-crimson font-sans">Programming</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                The ability of the CPU to execute multiple threads concurrently within a single process.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block">
                                1. Thread Lifecycle
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                A Java thread passes through five distinct states during its existence, managed entirely by the JVM and the underlying OS task scheduler.
                            </p>

                            <div className="flex flex-col gap-4 my-8">
                                {[
                                    { state: "New", desc: "Thread object created but start() not yet called." },
                                    { state: "Runnable", desc: "Thread ready to run; waiting for CPU time slice." },
                                    { state: "Running", desc: "Thread is actively executing its run() method." },
                                    { state: "Blocked/Waiting", desc: "Alive but not eligible to run; waiting for locks or sleep()." },
                                    { state: "Terminated", desc: "Finished execution or threw an unhandled exception." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 border border-charcoal/20 bg-white items-center">
                                        <span className="font-bold text-crimson w-32 border-r border-charcoal/20">{item.state}</span>
                                        <span className="text-charcoal-light">{item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            <CalloutBox type="exam">
                                <p>
                                    <strong>Exam Tip:</strong> Be prepared to draw the 5-state lifecycle diagram and explain the transitions (e.g., <code>start()</code> moves New &rarr; Runnable).
                                </p>
                            </CalloutBox>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                2. Creating Threads
                            </h2>
                            <CodeBlock language="java" filename="Main.java" code={threadCode} />

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                3. Process vs Thread
                            </h2>
                            <ul className="list-disc list-inside space-y-2 mb-6">
                                <li><strong>Process:</strong> Heavyweight. Separate memory address space. Expensive context switches (e.g., Chrome vs Excel).</li>
                                <li><strong>Thread:</strong> Lightweight. Shares memory within a process. Cheaper context switches (e.g., Tabs in Chrome).</li>
                            </ul>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <a className="group flex flex-col items-start" href="/concept/java-exceptions">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Exceptions</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-nio">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">File NIO</span>
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
