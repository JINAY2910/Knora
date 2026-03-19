"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ActivityTracker() {
    const { status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") return;

        // Ping the server every exact 60 seconds, adding 1/60th of an hour (1 minute) to the heatmap ledger.
        const trackingInterval = setInterval(async () => {
            try {
                const today = new Date().toISOString().split("T")[0];
                await fetch("/api/user/velocity", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // Represents 1 minute of active tracking
                    body: JSON.stringify({ date: today, value: 1 / 60 }),
                });
            } catch (error) {
                console.error("Activity Tracker failed to sync:", error);
            }
        }, 60000);

        return () => clearInterval(trackingInterval);
    }, [status]);

    return null; // Silent global watcher component
}
