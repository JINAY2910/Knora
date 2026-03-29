import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import TestResult from "@/models/TestResult";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        
        // Aggregate all test results for this user
        const results = await TestResult.find({ userEmail: session.user.email })
            .sort({ submittedAt: -1 })
            .lean();

        if (!results || results.length === 0) {
            return NextResponse.json({ weakTopics: [], strongTopics: [], recentTests: [], overallStats: null });
        }

        // Aggregate topic performance across all tests
        const topicMap: Record<string, { score: number; max: number; count: number }> = {};
        for (const result of results) {
            for (const qr of (result as any).questionResults || []) {
                if (!topicMap[qr.topic]) topicMap[qr.topic] = { score: 0, max: 0, count: 0 };
                topicMap[qr.topic].score += qr.score;
                topicMap[qr.topic].max += qr.maxScore;
                topicMap[qr.topic].count += 1;
            }
        }

        const allWeakTopics: any[] = [];
        const allStrongTopics: any[] = [];
        for (const [topic, { score, max }] of Object.entries(topicMap)) {
            const pct = max > 0 ? Math.round((score / max) * 100) : 0;
            if (pct < 60) {
                allWeakTopics.push({
                    topic,
                    percentage: pct,
                    priority: pct < 30 ? "high" : pct < 50 ? "medium" : "low",
                });
            } else if (pct >= 80) {
                allStrongTopics.push({ topic, percentage: pct });
            }
        }

        // Sort weak topics by priority
        const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
        allWeakTopics.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        const overallAvg = results.length > 0
            ? Math.round(results.reduce((s: number, r: any) => s + r.percentage, 0) / results.length)
            : 0;

        const recentTests = results.slice(0, 5).map((r: any) => ({
            id: r._id,
            testName: r.testName,
            subject: r.subject,
            percentage: r.percentage,
            grade: r.grade,
            submittedAt: r.submittedAt,
        }));

        return NextResponse.json({
            weakTopics: allWeakTopics,
            strongTopics: allStrongTopics,
            recentTests,
            overallStats: {
                totalTests: results.length,
                averageScore: overallAvg,
                bestScore: Math.max(...results.map((r: any) => r.percentage)),
            },
        });
    } catch (error) {
        console.error("Planner API error:", error);
        return NextResponse.json({ error: "Failed to load planner data." }, { status: 500 });
    }
}
