import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Method from "@/components/Method";
import Comparison from "@/components/Comparison";
import AIExaminer from "@/components/AIExaminer";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Navigation />
            <Hero />
            <Stats />
            <Method />
            <Comparison />
            <AIExaminer />
            <Footer />
        </main>
    );
}
