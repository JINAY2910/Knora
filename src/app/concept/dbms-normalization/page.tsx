import ConceptHeader from "@/components/concept/ConceptHeader";
import ConceptSidebar from "@/components/concept/ConceptSidebar";
import FloatingActions from "@/components/concept/FloatingActions";
import { dbmsModules } from "@/data/dbmsModules";

export default function DbmsNormalizationPage() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-cream">
            <ConceptHeader
                subject="Database Management Systems"
                topic="Unit 3"
                conceptTitle="The Data Slicer (Normalization)"
                userInitials="YY"
                examMode={false}
            />
            <div className="flex flex-1 overflow-hidden relative">
                <ConceptSidebar sections={dbmsModules} activeSection="dbms-normalization" />
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-cream flex items-center justify-center p-10">
                    <div className="text-center max-w-lg">
                        <span className="material-symbols-outlined text-6xl text-charcoal/20 mb-4">grid_on</span>
                        <h2 className="text-3xl font-bold text-charcoal mb-4">The Data Slicer: Coming Soon</h2>
                        <p className="text-charcoal-light">This interactive mini-game is currently under construction. Check back soon to practice 1NF, 2NF, and 3NF!</p>
                    </div>
                </main>
                <FloatingActions />
            </div>
        </div>
    );
}
