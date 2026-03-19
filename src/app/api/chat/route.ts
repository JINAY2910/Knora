import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json(); 
        
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API key is not configured in the environment." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        const systemPrompt = `You are the Knora AI Tutor, an advanced learning assistant integrated directly into Knora. Knora is a modern, brutalist-styled computer science education platform. You exist to help students master complex CS topics with simple, highly accurate explanations. 
If they ask about the platform, explain features like the 'Learning Velocity Heatmap' (which automatically tracks study consistency in the background) or the dynamic 'AI Practice Testing' (which dynamically generates quizzes at a 75% MCQ / 25% Theory ratio). 
Maintain a supportive, concise, and highly intelligent persona. Do not babble; answer precisely. Use markdown for code snippets. Represent the brutalist, direct aesthetic of Knora.`;

        // Configure the model with system instruction
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt 
        });

        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided." }, { status: 400 });
        }

        // Isolate the latest request
        const lastMessage = messages[messages.length - 1];
        
        // Gemini explicitly expects history in the format: { role: 'user' | 'model', parts: [{ text: string }] }
        // CRITICAL: The history array MUST natively start with a 'user' message to compile.
        let history = messages.slice(0, -1);
        
        // Strip out the initial welcome 'model' message if it's the very first item in history
        if (history.length > 0 && history[0].role === "model") {
            history.shift();
        }

        const chat = model.startChat({
            history,
        });

        const latestText = lastMessage.parts[0].text;
        const result = await chat.sendMessage(latestText);
        const responseText = result.response.text();

        return NextResponse.json({ text: responseText });

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to generate AI response. Check server logs.";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
