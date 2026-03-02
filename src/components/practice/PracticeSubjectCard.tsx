import Link from "next/link";

interface PracticeSubjectCardProps {
    title: string;
    modules: number;
    testsTarget: number;
    completedTests: number;
    status: "active" | "locked" | "complete";
    icon: string;
    href: string;
    tests: Array<{
        title: string;
        duration: string;
        difficulty: string;
        completed: boolean;
        locked: boolean;
    }>;
}

export default function PracticeSubjectCard({
    title,
    modules,
    testsTarget,
    completedTests,
    status,
    icon,
    href,
    tests
}: PracticeSubjectCardProps) {
    const progress = Math.round((completedTests / testsTarget) * 100) || 0;

    const getButtonText = () => {
        if (status === "locked" || progress === 0) return "START PRACTICE";
        if (status === "complete") return "RETAKE TESTS";
        return "CONTINUE PRACTICE";
    };

    const getProgressColor = () => {
        if (progress >= 100) return "bg-green-500";
        if (progress >= 33) return "bg-crimson";
        return "bg-charcoal";
    };

    return (
        <Link href={href} className="block h-full">
            <div className={`group relative h-full bg-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-4px] translate-y-[-4px] hover:translate-x-0 hover:translate-y-0 hover:shadow-none transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[420px]`}>

                {/* Header: Icon + Progress */}
                <div className="p-6 pb-2 flex justify-between items-start">
                    <div className={`w-12 h-12 border-2 border-charcoal flex items-center justify-center ${status === 'locked' ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-cream text-charcoal'}`}>
                        <span className="material-symbols-outlined text-[24px]">{icon}</span>
                    </div>

                    <div className={`flex flex-col items-end w-32 ${status === 'locked' ? 'opacity-50' : ''}`}>
                        <div className="flex justify-between w-full items-end mb-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Tests Done
                            </span>
                            <span className="text-xs font-bold text-charcoal font-mono">{completedTests}/{testsTarget}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 relative">
                            <div
                                className={`absolute top-0 left-0 h-full ${getProgressColor()}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Title Section */}
                <div className="px-6 mb-6 mt-4">
                    <h3 className="text-2xl font-bold text-charcoal mb-1 leading-none tracking-tight">{title}</h3>
                    <p className="text-xs text-gray-400 font-medium">
                        {modules} Modules • {testsTarget} Practice Tests
                    </p>
                </div>

                {/* Tests List */}
                <div className="flex-1 bg-gray-50 p-6 pt-5 border-t border-gray-100 flex flex-col gap-4">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Available Tests
                    </h4>

                    <div className="space-y-4">
                        {tests.map((test, index) => (
                            <div key={index} className="flex items-center justify-between group/item">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <span className={`material-symbols-outlined text-[20px] shrink-0 ${test.locked ? 'text-gray-300' : test.completed ? 'text-green-500' : 'text-charcoal'}`}>
                                        {test.locked ? 'lock' : test.completed ? 'check_circle' : 'assignment'}
                                    </span>
                                    <div className="flex flex-col">
                                        <p className={`text-sm font-bold leading-tight ${test.locked ? 'text-gray-400' : test.completed ? 'text-charcoal/70 line-through' : 'text-charcoal group-hover/item:text-crimson transition-colors'}`}>
                                            {test.title}
                                        </p>
                                        <span className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase tracking-wide">
                                            {test.duration}
                                        </span>
                                    </div>
                                </div>

                                {test.difficulty && (
                                    <span className={`shrink-0 px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wide ml-2 
                                        ${test.locked ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white border-charcoal text-charcoal'}
                                    `}>
                                        {test.difficulty}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="w-full bg-white border-t-2 border-gray-100 py-4 text-center group-hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-bold text-crimson uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        {getButtonText()} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
