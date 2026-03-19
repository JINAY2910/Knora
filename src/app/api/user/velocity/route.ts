import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const today = new Date().toISOString().split("T")[0];
        const hasToday = user.learningVelocity.some((v: any) => v.date === today);
        
        if (!hasToday) {
            user.learningVelocity.push({ date: today, value: 0 });
            await user.save();
        }

        return NextResponse.json({ learningVelocity: user.learningVelocity || [] });
    } catch (error) {
        console.error("Fetch velocity error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Optional endpoint to record activity
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { date, value } = await req.json();

        if (!date || value === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if date already exists
        const existingEntry = user.learningVelocity.find((v: any) => v.date === date);
        if (existingEntry) {
            existingEntry.value += value;
        } else {
            user.learningVelocity.push({ date, value });
        }

        await user.save();

        return NextResponse.json({ success: true, learningVelocity: user.learningVelocity });
    } catch (error) {
        console.error("Add velocity error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
