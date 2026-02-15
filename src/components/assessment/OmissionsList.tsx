interface Omission {
    concept: string;
    questionRef: string;
}

interface OmissionsListProps {
    omissions: Omission[];
}

export default function OmissionsList({ omissions }: OmissionsListProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
                <h4 className="text-lg font-serif font-bold text-charcoal">Omissions</h4>
                <span className="material-symbols-outlined text-charcoal text-xl">remove_circle_outline</span>
            </div>
            {omissions.map((omission, index) => (
                <div key={index} className="bg-paper p-5 border border-charcoal/40 border-dashed">
                    <div className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full border border-charcoal bg-transparent"></div>
                        <div>
                            <p className="text-base font-serif font-bold text-charcoal">{omission.concept}</p>
                            <p className="text-sm text-charcoal-light mt-1 leading-relaxed">{omission.questionRef}: Formula definition was absent.</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
