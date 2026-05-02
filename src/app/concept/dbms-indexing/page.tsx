import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import { dbmsModules } from "@/data/dbmsModules";

export default function DbmsIndexingPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 6"
                conceptTitle="B+ Tree Data Race"
                userInitials="YY"
                examMode={false}
            />
            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-indexing" />
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-cream flex items-center justify-center p-10">
                    <div className="text-center max-w-lg">
                        <span className="material-symbols-outlined text-6xl text-charcoal/20 mb-4">speed</span>
                        <h2 className="text-3xl font-bold text-charcoal mb-4">Coming Soon</h2>
                        <p className="text-charcoal-light">The indexing drag race simulator is revving its engines. Check back later to test full table scans vs B+ Trees!</p>
                    </div>
                </main>
                <FloatingActions />
            </div>
        </div>
    );
}
