import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import TestResult from "@/models/TestResult";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ resultId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { resultId } = await params;
        await dbConnect();
        const result = await TestResult.findById(resultId).lean();
        if (!result) {
            return NextResponse.json({ error: "Result not found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Fetch result error:", error);
        return NextResponse.json({ error: "Failed to load result." }, { status: 500 });
    }
}
