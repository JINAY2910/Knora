interface SkillMatrixProps {
    skills: {
        logic: number;
        recall: number;
        analysis: number;
        speed: number;
        structure: number;
    };
}

export default function SkillMatrix({ skills }: SkillMatrixProps) {
    // Calculate highest and lowest skills
    const skillEntries = Object.entries(skills) as [string, number][];
    const highest = skillEntries.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
    const lowest = skillEntries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));

    // Convert skill percentages to pentagon coordinates (0-100 scale)
    // Pentagon has 5 points, radius from center is proportional to skill value
    const getPoint = (angle: number, value: number) => {
        const radius = (value / 100) * 35; // Scale to fit in viewBox
        const radian = ((angle - 90) * Math.PI) / 180; // Start from top
        return {
            x: 50 + radius * Math.cos(radian),
            y: 50 + radius * Math.sin(radian),
        };
    };

    const angles = [0, 72, 144, 216, 288]; // Pentagon angles (360/5)
    const skillValues = [skills.logic, skills.structure, skills.recall, skills.analysis, skills.speed];

    const points = angles
        .map((angle, index) => {
            const point = getPoint(angle, skillValues[index]);
            return `${point.x},${point.y}`;
        })
        .join(" ");

    return (
        <div className="lg:col-span-4 bg-charcoal text-cream p-8 flex flex-col relative overflow-hidden shadow-heavy border-2 border-charcoal">
            <div className="flex justify-between items-center mb-8 z-10 border-b border-cream/20 pb-4">
                <h3 className="text-xl font-serif font-bold">Skill Matrix</h3>
                <button className="text-xs text-cream/70 hover:text-crimson transition-colors uppercase tracking-widest font-bold">
                    View History
                </button>
            </div>
            <div className="flex-grow flex items-center justify-center relative py-4 z-10">
                <div className="relative w-64 h-64">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex justify-center">
                        <div className="w-px h-full bg-cream/20 border-l border-dashed border-cream/30"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="h-px w-full bg-cream/20 border-t border-dashed border-cream/30"></div>
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center transform rotate-45">
                        <div className="w-px h-full bg-cream/20 border-l border-dashed border-cream/30"></div>
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center transform -rotate-45">
                        <div className="w-px h-full bg-cream/20 border-l border-dashed border-cream/30"></div>
                    </div>

                    {/* SVG Pentagon */}
                    <svg className="absolute inset-0 w-full h-full transform scale-75" viewBox="0 0 100 100">
                        <polygon
                            fill="rgba(250, 39, 66, 0.2)"
                            points={points}
                            stroke="#fa2742"
                            strokeWidth="2"
                        ></polygon>
                        {angles.map((angle, index) => {
                            const point = getPoint(angle, skillValues[index]);
                            return (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    fill="#e8eae3"
                                    r="3"
                                    stroke="#373833"
                                    strokeWidth="1"
                                ></circle>
                            );
                        })}
                    </svg>

                    {/* Labels */}
                    <span className="absolute top-0 font-serif italic text-sm text-cream bg-charcoal px-2">Logic</span>
                    <span className="absolute bottom-10 right-0 font-serif italic text-sm text-cream bg-charcoal px-2">
                        Recall
                    </span>
                    <span className="absolute bottom-10 left-0 font-serif italic text-sm text-cream bg-charcoal px-2">
                        Analysis
                    </span>
                    <span className="absolute top-1/3 left-0 font-serif italic text-sm text-cream bg-charcoal px-2">
                        Speed
                    </span>
                    <span className="absolute top-1/3 right-0 font-serif italic text-sm text-cream bg-charcoal px-2">
                        Structure
                    </span>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-px bg-cream/20 border border-cream/20">
                <div className="bg-charcoal p-3 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-cream/60 mb-1">Highest</p>
                    <p className="text-lg font-bold text-white font-serif capitalize">
                        {highest[0]} <span className="text-crimson text-sm">{highest[1]}%</span>
                    </p>
                </div>
                <div className="bg-charcoal p-3 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-cream/60 mb-1">Lowest</p>
                    <p className="text-lg font-bold text-white font-serif capitalize">
                        {lowest[0]} <span className="text-crimson text-sm">{lowest[1]}%</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
