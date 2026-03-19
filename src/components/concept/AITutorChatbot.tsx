"use client";

import { useState, useRef, useEffect } from "react";

interface AITutorChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

// Define message structure
interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

export default function AITutorChatbot({ isOpen, onClose }: AITutorChatbotProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "model", parts: [{ text: "Hello! I am the Knora AI Tutor. I can help explain difficult concepts, answer general CS questions, or guide you around the platform. What's on your mind?" }] }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    if (!isOpen) return null;

    const sendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        // Append User Message
        const newMessages: ChatMessage[] = [
            ...messages, 
            { role: "user", parts: [{ text: trimmedInput }] }
        ];
        
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch AI response");
            }

            // Append Model Message
            setMessages((prev) => [
                ...prev,
                { role: "model", parts: [{ text: data.text }] }
            ]);

        } catch (error: any) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", parts: [{ text: `Error: ${error.message}` }] }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-80 w-[380px] h-[500px] bg-cream border-2 border-charcoal shadow-[6px_6px_0px_0px_rgba(55,56,51,1)] z-50 flex flex-col font-sans transition-all duration-300">
            {/* Header */}
            <div className="bg-charcoal text-cream p-4 flex justify-between items-center border-b-2 border-charcoal">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-crimson text-xl animate-pulse">auto_awesome</span>
                    <h2 className="font-bold text-sm tracking-[0.2em] uppercase">Knora Tutor</h2>
                </div>
                <button 
                    onClick={onClose}
                    className="text-cream hover:text-crimson transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4 bg-[#f8f7f4]">
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`max-w-[85%] p-3 text-sm ${
                            msg.role === "user" 
                            ? "bg-charcoal text-white self-end border border-charcoal rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-[2px_2px_0px_0px_rgba(250,39,66,1)]" 
                            : "bg-white text-charcoal self-start border-2 border-charcoal rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]"
                        }`}
                        style={{ whiteSpace: "pre-wrap" }}
                    >
                        {msg.parts[0].text}
                    </div>
                ))}
                
                {isLoading && (
                    <div className="bg-white text-charcoal self-start border-2 border-charcoal rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] p-3 max-w-[85%] flex gap-1">
                        <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="p-3 bg-white border-t-2 border-charcoal flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="flex-1 bg-[#f8f7f4] border-2 border-charcoal px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-crimson placeholder:text-gray-400 disabled:opacity-50 transition-colors"
                />
                <button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-crimson text-white px-3 border-2 border-charcoal hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(55,56,51,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
            </form>
        </div>
    );
}
