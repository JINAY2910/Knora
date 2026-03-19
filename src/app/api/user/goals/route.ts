import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !(session.user as any).id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findById((session.user as any).id);
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ goals: user.goals || [] });
    } catch (error) {
        console.error("Fetch goals error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !(session.user as any).id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, date, month, type, duration } = await req.json();

        if (!title || !date || !month || !type || !duration) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findById((session.user as any).id);
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newGoal = { title, date, month, type, duration };
        user.goals.push(newGoal);
        await user.save();

        return NextResponse.json({ success: true, goal: newGoal });
    } catch (error) {
        console.error("Add goal error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
