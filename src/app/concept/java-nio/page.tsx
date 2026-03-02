import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import CalloutBox from "@/components/concept/CalloutBox";
import { javaModules } from "@/data/javaModules";

export default function JavaNioPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Java Programming"
                topic="Module 9"
                conceptTitle="File NIO"
                userInitials="JS"
                examMode={true}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={javaModules} activeSection="java-nio" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth pb-32 bg-cream">
                    {/* Progress Bar */}
                    <div className="sticky top-0 z-10 w-full h-1.5 bg-charcoal/10">
                        <div className="h-full bg-crimson w-[90%]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 py-16 md:py-20">
                        {/* Title Section */}
                        <div className="mb-12 border-b-2 border-charcoal pb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-xs font-bold bg-charcoal text-white uppercase tracking-wider">
                                    Module 9
                                </span>
                                <span className="px-3 py-1 text-xs font-bold text-charcoal-light flex items-center gap-1 uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 15 min read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-6 leading-[1.1] font-sans">
                                File NIO: <br />
                                <span className="text-crimson font-sans">New Input/Output</span>
                            </h1>
                            <p className="text-xl text-charcoal-light font-normal leading-relaxed max-w-2xl font-sans">
                                Java NIO is buffer-oriented and supports non-blocking I/O, designed for high-performance enterprise applications.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose-custom text-charcoal max-w-none">
                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-10 border-b-2 border-charcoal pb-2 inline-block">
                                1. NIO Fundamentals
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed">
                                The traditional <code>java.io</code> is stream-oriented and strictly blocking. <code>java.nio</code> utilizes a high-performance triad: Buffers, Channels, and Selectors.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                                <div className="p-6 bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                                    <h3 className="text-xl font-bold text-charcoal mb-3">Buffer</h3>
                                    <p className="text-sm text-charcoal-light leading-relaxed">
                                        Fixed-size container for primitive data (e.g. ByteBuffer, CharBuffer). Data must be written to/read from a buffer before touching a channel.
                                    </p>
                                </div>
                                <div className="p-6 bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                                    <h3 className="text-xl font-bold text-charcoal mb-3">Channel</h3>
                                    <p className="text-sm text-charcoal-light leading-relaxed">
                                        A bidirectional open connection to an I/O source. Unlike streams, they can both read and write simultaneously.
                                    </p>
                                </div>
                                <div className="p-6 bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(250,39,66,1)]">
                                    <h3 className="text-xl font-bold text-charcoal mb-3">Selector</h3>
                                    <p className="text-sm text-charcoal-light leading-relaxed">
                                        The cornerstone of non-blocking I/O. Allows a single thread to monitor multiple Channels and service them only when they have data ready.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-3xl text-charcoal font-sans mb-6 mt-12 border-b-2 border-charcoal pb-2 inline-block">
                                2. Byte vs Character Streams
                            </h2>
                            <ul className="list-disc list-inside space-y-2 mb-6">
                                <li><strong>Byte Streams (InputStream/OutputStream):</strong> Deal with raw binary data like images, audio files, and executables.</li>
                                <li><strong>Character Streams (Reader/Writer):</strong> Deal with text data in Unicode. Automatically handles character encoding properly.</li>
                            </ul>

                            <CalloutBox type="concept">
                                <p>
                                    <strong>Serialization:</strong> Converting an object's state into a byte stream for storage or transmission. Classes must implement the <code>Serializable</code> marker interface. Fields marked <code>transient</code> are skipped!
                                </p>
                            </CalloutBox>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="mt-20 pt-10 border-t-2 border-charcoal flex justify-between items-center">
                            <a className="group flex flex-col items-start" href="/concept/java-multithreading">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Previous
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    <span className="font-sans font-bold text-xl">Multithreading</span>
                                </div>
                            </a>
                            <button className="px-8 py-3 bg-charcoal text-white text-sm font-bold uppercase tracking-widest hover:bg-crimson transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] border border-transparent">
                                Mark Complete
                            </button>
                            <a className="group flex flex-col items-end" href="/concept/java-collections">
                                <span className="text-xs font-bold uppercase tracking-widest text-charcoal-light mb-2 group-hover:text-crimson transition-colors">
                                    Next
                                </span>
                                <div className="flex items-center gap-2 text-charcoal group-hover:text-crimson transition-colors">
                                    <span className="font-sans font-bold text-xl">Collections</span>
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
