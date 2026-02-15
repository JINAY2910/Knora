"use client";

interface CodeBlockProps {
    language: string;
    filename?: string;
    code: string;
}

export default function CodeBlock({ language, filename, code }: CodeBlockProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="relative group my-8 border-2 border-charcoal bg-paper shadow-[4px_4px_0px_0px_rgba(55,56,51,1)]">
            {filename && (
                <div className="flex items-center justify-between px-4 py-2 border-b-2 border-charcoal bg-white">
                    <span className="text-xs text-charcoal font-bold font-mono uppercase tracking-wider">
                        {filename}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="text-charcoal hover:text-crimson transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                </div>
            )}
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed bg-paper text-charcoal">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
}
