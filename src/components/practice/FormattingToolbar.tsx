"use client";

interface FormattingToolbarProps {
    onFormat: (type: "bold" | "italic" | "list") => void;
}

export default function FormattingToolbar({ onFormat }: FormattingToolbarProps) {
    return (
        <div className="flex items-center gap-1 text-editorial-charcoal/60">
            <button
                onClick={() => onFormat("bold")}
                className="p-1.5 hover:bg-editorial-charcoal/10 hover:text-editorial-charcoal rounded-none"
                title="Bold"
            >
                <span className="material-symbols-outlined text-lg">format_bold</span>
            </button>
            <button
                onClick={() => onFormat("italic")}
                className="p-1.5 hover:bg-editorial-charcoal/10 hover:text-editorial-charcoal rounded-none"
                title="Italic"
            >
                <span className="material-symbols-outlined text-lg">format_italic</span>
            </button>
            <div className="w-px h-4 bg-editorial-charcoal/20 mx-1"></div>
            <button
                onClick={() => onFormat("list")}
                className="p-1.5 hover:bg-editorial-charcoal/10 hover:text-editorial-charcoal rounded-none"
                title="Bullet List"
            >
                <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
            </button>
        </div>
    );
}
