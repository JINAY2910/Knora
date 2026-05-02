import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import { dbmsModules } from "@/data/dbmsModules";

export default function DbmsNosqlPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 1"
                conceptTitle="RDBMS vs NoSQL"
                userInitials="YY"
                examMode={false}
            />
            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-nosql" />
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-cream flex items-center justify-center p-10">
                    <div className="text-center max-w-lg">
                        <span className="material-symbols-outlined text-6xl text-charcoal/20 mb-4">construction</span>
                        <h2 className="text-3xl font-bold text-charcoal mb-4">Module Locked</h2>
                        <p className="text-charcoal-light">You must complete the previous interactive module to unlock this section. Complete the ER Sandbox to proceed!</p>
                    </div>
                </main>
                <FloatingActions />
            </div>
        </div>
    );
}
