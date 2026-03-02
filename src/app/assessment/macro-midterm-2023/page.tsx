"use client";

import AssessmentNav from "@/components/assessment/AssessmentNav";
import AssessmentHeader from "@/components/assessment/AssessmentHeader";
import SkillMatrix from "@/components/assessment/SkillMatrix";
import ExaminerInsight from "@/components/assessment/ExaminerInsight";
import StatCard from "@/components/assessment/StatCard";
import StrengthsList from "@/components/assessment/StrengthsList";
import LogicalGapsList from "@/components/assessment/LogicalGapsList";
import OmissionsList from "@/components/assessment/OmissionsList";
import AnswerTranscript from "@/components/assessment/AnswerTranscript";
import AssessmentFooter from "@/components/assessment/AssessmentFooter";

// Mock assessment data
const assessmentData = {
    examType: "Mid-Term Simulation",
    title: "Advanced Macroeconomics:<br/>Global Markets Analysis",
    date: "October 24, 2023",
    duration: "2h 15m",
    score: 88,
    totalScore: 100,
    grade: "A-",
    status: "Completed" as const,

    skills: {
        logic: 96,
        recall: 80,
        analysis: 75,
        speed: 72,
        structure: 90,
    },

    insight: {
        text: "Your argument for the IS-LM model was robust, but you failed to account for the liquidity trap scenario in Question 3. This indicates a gap in understanding edge cases in fiscal policy. Your logical flow is strong, but concise writing needs work—you averaged 25% more words than the model answer.",
        highlightedConcepts: ["liquidity trap scenario"],
        actions: [
            { label: "Review Concepts: Liquidity Traps", icon: "play_circle" },
            { label: "Practice Concise Writing", icon: "edit_note" },
        ],
    },

    strengths: [
        {
            title: "Inflation Triggers Identified",
            questionRef: "Q2",
            description: "Correctly linked supply chain disruption to cost-push inflation.",
        },
        {
            title: "Monetary Policy Definition",
            questionRef: "Q5",
            description: "Accurate distinction between fiscal and monetary levers.",
        },
        {
            title: "Graph Interpretation",
            questionRef: "Q8",
            description: "Successfully calculated the equilibrium point shift.",
        },
    ],

    logicalGaps: [
        {
            type: "Circular Reasoning",
            icon: "schema",
            title: "Circular Reasoning",
            description: "Q3: You stated interest rates rose because bond prices fell, but used the rate rise to explain the bond price fall.",
            questionRef: 3,
        },
        {
            type: "Unfounded Assumption",
            icon: "call_split",
            title: "Unfounded Assumption",
            description: "Q7: Assumed perfect market competition in an oligopoly scenario without justification.",
            questionRef: 7,
        },
    ],

    omissions: [
        { concept: "Keynesian Multiplier", questionRef: "Q1" },
        { concept: "Time Lag Effects", questionRef: "Q4" },
    ],

    questions: [
        {
            id: 3,
            question: "Explain the relationship between bond prices and interest rates.",
            studentAnswer: 'Bond prices and interest rates generally have an inverse relationship. When new bonds are issued with higher interest rates, existing bonds with lower rates become less attractive, forcing their prices down. <span class="bg-crimson/10 text-crimson-dark px-1 border-b-2 border-crimson cursor-help" title="Circular reasoning detected here">Conversely, as bond prices fall, the effective yield rises, which causes interest rates to increase across the market.</span> This mechanism ensures equilibrium in the loanable funds market.',
            score: 6,
            totalScore: 10,
            status: "Logical Gap" as const,
            issues: [
                {
                    type: "error" as const,
                    title: "Causality Error",
                    description: "You've confused the effect for the cause. Bond yields rise *because* prices fall (mathematical relationship), but market interest rates don't rise *because* bond prices fall. Central bank policy or market demand drives rates, which then impacts bond prices.",
                },
                {
                    type: "success" as const,
                    title: "Strong Opening",
                    description: "The initial definition of the inverse relationship is textbook perfect.",
                },
            ],
        },
        {
            id: 4,
            question: "Discuss the limitations of Fiscal Policy...",
            studentAnswer: "",
            score: 10,
            totalScore: 10,
            status: "Perfect Score" as const,
            issues: [],
        },
    ],
};

export default function AssessmentPage() {
    const handleNotification = () => alert("Notifications");
    const handleDownload = () => alert("Downloading PDF...");
    const handleShare = () => alert("Sharing results...");
    const handleRetake = () => alert("Retaking exam...");
    const handleNextModule = () => alert("Proceeding to next module...");

    const handleActionClick = (label: string) => {
        alert(`Action: ${label}`);
    };

    return (
        <div className="bg-cream text-charcoal font-sans min-h-screen flex flex-col selection:bg-crimson selection:text-white">
            <AssessmentNav userInitials="JS" onNotificationClick={handleNotification} />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                {/* Pattern Grid Background */}
                <div className="absolute inset-0 pattern-grid pointer-events-none z-0 h-96"></div>

                <AssessmentHeader
                    examType={assessmentData.examType}
                    title={assessmentData.title}
                    date={assessmentData.date}
                    duration={assessmentData.duration}
                    score={assessmentData.score}
                    totalScore={assessmentData.totalScore}
                    grade={assessmentData.grade}
                    status={assessmentData.status}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 relative z-10">
                    <SkillMatrix skills={assessmentData.skills} />

                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <ExaminerInsight
                            insight={assessmentData.insight.text}
                            highlightedConcepts={assessmentData.insight.highlightedConcepts}
                            actions={assessmentData.insight.actions.map(action => ({
                                ...action,
                                onClick: () => handleActionClick(action.label),
                            }))}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="Correct Points" value={42} total={50} />
                            <StatCard label="Missing Concepts" value={5} suffix="Items" accentColor="crimson" />
                            <StatCard label="Logical Gaps" value={3} suffix="Detected" accentColor="crimson" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 relative z-10">
                    <StrengthsList strengths={assessmentData.strengths} />
                    <LogicalGapsList gaps={assessmentData.logicalGaps} />
                    <OmissionsList omissions={assessmentData.omissions} />
                </div>

                <AnswerTranscript questions={assessmentData.questions} />
            </main>

            <AssessmentFooter
                onDownload={handleDownload}
                onShare={handleShare}
                onRetake={handleRetake}
                onNextModule={handleNextModule}
            />
        </div>
    );
}
