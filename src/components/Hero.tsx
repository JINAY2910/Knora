import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#e8eae3]">
            {/* Background Texture */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
                {/* Left Content */}
                <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-background-dark text-xs font-bold uppercase tracking-wider text-text-main mb-6 shadow-[2px_2px_0px_0px_rgba(55,56,51,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        AI-Powered Learning Engine v2.0
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold tracking-tight text-text-main leading-[1.2] mb-6">
                        Mastering<br />
                        <span className="text-primary whitespace-nowrap">Java & C++</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
                        Elevate your programming skills. KNORA is the premium AI examiner that guides you through the intricacies of Java and C++, decoding your thinking style and adapting your curriculum in real-time.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link
                            href="#"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-serif font-bold text-center transition-all border border-background-dark shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(55,56,51,1)]"
                        >
                            Start Your Prep Free
                        </Link>
                        <Link
                            href="#"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-background-dark text-text-main font-serif font-bold text-center hover:bg-background-dark hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-icons-round text-sm">play_arrow</span>
                            Watch Demo
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-text-main text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <span className="material-icons-round text-primary text-base">check_circle</span>
                            <span>Core Concepts & Paradigms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-icons-round text-primary text-base">check_circle</span>
                            <span>Adaptive AI</span>
                        </div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="lg:w-1/2 w-full relative">
                    <div className="relative w-full aspect-square max-w-lg mx-auto">
                        {/* Animated Circles */}
                        <div className="absolute inset-0 border-2 border-dashed border-background-dark/20 rounded-full scale-100 animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute inset-0 border border-background-dark/10 rounded-full scale-75"></div>

                        {/* Main Dashboard */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-[90%] h-auto bg-white border-2 border-background-dark shadow-[8px_8px_0px_0px_rgba(55,56,51,0.1)] overflow-hidden">
                                {/* Browser Bar */}
                                <div className="absolute top-0 left-0 w-full h-8 bg-background-light border-b-2 border-background-dark flex items-center px-4 gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full border border-background-dark bg-white"></div>
                                    <div className="w-2.5 h-2.5 rounded-full border border-background-dark bg-white"></div>
                                    <div className="w-2.5 h-2.5 rounded-full border border-background-dark bg-white"></div>
                                </div>

                                {/* Dashboard Image */}
                                <img
                                    alt="KNORA Dashboard UI"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 contrast-125"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjIuNLJvXEkcyK9QTqMb-e_Uc9azoocjMzJqJWp3Xz0G_8FbISdn5ELFy1e8PWqKZpVlfT2Di9yeIOGlgmsVaAxpwhE5auLVvO_fMOty7bAwjOF-ZVI7zOCVyE8j34rV8fNwzzsFLtl4vIVcNFnzxd3JOL3QKkKkJMFUct95SH8VJGK_r4UUHxg2cfq41F6KhCEU_2nF61u5lbxU_sCxLNn7D10SNAtcLNXBCCoAiDMhT33TU4bwJ88O7CQu61w9w9rTabnSus80M"
                                />

                                {/* Logic Score Card */}
                                <div className="absolute -right-6 bottom-10 bg-white border-2 border-background-dark p-4 shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] w-48">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                                            Code Proficiency
                                        </span>
                                        <span className="text-primary text-xs font-bold">+12%</span>
                                    </div>
                                    <div className="h-2 w-full bg-background-light border border-background-dark overflow-hidden">
                                        <div className="h-full bg-primary w-[78%]"></div>
                                    </div>
                                    <div className="mt-2 text-2xl font-serif font-bold text-text-main">92.4</div>
                                </div>

                                {/* Next Topic Card */}
                                <div className="absolute -left-4 top-20 bg-background-dark text-white border-2 border-background-dark p-3 shadow-xl w-40">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white border border-white/20 flex items-center justify-center text-background-dark">
                                            <span className="material-icons-round text-sm">psychology</span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-300 uppercase tracking-wider">
                                                Next Topic
                                            </div>
                                            <div className="text-xs font-serif font-bold text-white">
                                                C++ Pointers
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
