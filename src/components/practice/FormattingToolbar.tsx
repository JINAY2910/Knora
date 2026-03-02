"use client";

interface FormattingToolbarProps {
    onFormat: (type: "bold" | "italic" | "list") => void;
    activeFormats: {
        bold: boolean;
        italic: boolean;
        list: boolean;
    };
}

export default function FormattingToolbar({ onFormat, activeFormats }: FormattingToolbarProps) {
    return (
        <div className="flex items-center gap-2 text-editorial-charcoal overflow-hidden">
            <button
                onClick={() => onFormat("bold")}
                className={`w-9 h-9 flex items-center justify-center transition-colors ${activeFormats.bold ? "bg-charcoal/30 text-black shadow-inner" : "bg-black/5 hover:bg-black/10 text-editorial-charcoal"}`}
                title="Bold"
            >
                <span className="material-symbols-outlined text-[20px]">format_bold</span>
            </button>
            <button
                onClick={() => onFormat("italic")}
                className={`w-9 h-9 flex items-center justify-center transition-colors ${activeFormats.italic ? "bg-charcoal/30 text-black shadow-inner" : "bg-black/5 hover:bg-black/10 text-editorial-charcoal"}`}
                title="Italic"
            >
                <span className="material-symbols-outlined text-[20px]">format_italic</span>
            </button>
            <button
                onClick={() => onFormat("list")}
                className={`w-9 h-9 flex items-center justify-center transition-colors ${activeFormats.list ? "bg-charcoal/30 text-black shadow-inner" : "bg-black/5 hover:bg-black/10 text-editorial-charcoal"}`}
                title="Bullet List"
            >
                <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
            </button>
        </div>
    );
}
