interface Strength {
    title: string;
    questionRef: string;
    description: string;
}

interface StrengthsListProps {
    strengths: Strength[];
}

export default function StrengthsList({ strengths }: StrengthsListProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
                <h4 className="text-lg font-serif font-bold text-charcoal">Strengths</h4>
                <span className="material-symbols-outlined text-charcoal text-xl">check_circle_outline</span>
            </div>
            {strengths.map((strength, index) => (
                <div key={index} className="bg-white p-5 border border-charcoal shadow-[4px_4px_0px_0px_rgba(55,56,51,0.05)]">
                    <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 bg-charcoal rotate-45"></div>
                        <div>
                            <p className="text-base font-serif font-bold text-charcoal">{strength.title}</p>
                            <p className="text-sm text-charcoal-light mt-1 leading-relaxed">
                                {strength.questionRef}: {strength.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
