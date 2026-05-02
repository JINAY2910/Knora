import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import { dbmsModules } from "@/data/dbmsModules";

export default function DbmsSecurityPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 5"
                conceptTitle="Hack & Patch Cyber Range"
                userInitials="YY"
                examMode={false}
            />
            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-security" />
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-charcoal text-cream flex items-center justify-center p-10">
                    <div className="text-center max-w-lg border border-red-500 p-8 bg-black">
                        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">security</span>
                        <h2 className="text-3xl font-bold text-red-500 font-mono mb-4">SYSTEM LOCKED</h2>
                        <p className="text-gray-400 font-mono">You do not have the required privileges to access the cyber range yet. Complete previous modules to unlock.</p>
                    </div>
                </main>
                <FloatingActions />
            </div>
        </div>
    );
}
