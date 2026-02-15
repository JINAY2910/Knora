export default function FloatingActions() {
    return (
        <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-50">
            <button
                className="h-12 w-12 bg-white text-charcoal border-2 border-charcoal hover:bg-crimson hover:text-white hover:border-crimson shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] flex items-center justify-center transition-all"
                title="Toggle Focus Mode"
            >
                <span className="material-symbols-outlined">fullscreen</span>
            </button>
            <button
                className="h-14 w-14 bg-charcoal text-white border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(250,39,66,1)] flex items-center justify-center transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(250,39,66,1)]"
                title="Take Notes"
            >
                <span className="material-symbols-outlined">edit_note</span>
            </button>
        </div>
    );
}
