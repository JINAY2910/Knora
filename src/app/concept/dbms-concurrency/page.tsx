import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import { dbmsModules } from "@/data/dbmsModules";

export default function DbmsConcurrencyPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 4"
                conceptTitle="Bank Heist Simulator (ACID)"
                userInitials="YY"
                examMode={false}
            />
            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-concurrency" />
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-cream flex items-center justify-center p-10">
                    <div className="text-center max-w-lg">
                        <span className="material-symbols-outlined text-6xl text-charcoal/20 mb-4">account_balance</span>
                        <h2 className="text-3xl font-bold text-charcoal mb-4">Under Construction</h2>
                        <p className="text-charcoal-light">The ACID transaction visualizer is currently being built. You'll soon be able to test concurrency and locking protocols here!</p>
                    </div>
                </main>
                <FloatingActions />
            </div>
        </div>
    );
}
