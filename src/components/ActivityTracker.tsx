"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function ActivityTracker() {
    const { status } = useSession();
    
    const activeTimeRef = useRef(0);
    const lastEventTimeRef = useRef(Date.now());
    
    // Config
    const IDLE_TIMEOUT = 60000; // 1 minute of no events = idle
    const REPORT_INTERVAL = 30000; // Send to backend every 30 seconds of ACTIVE time
    
    useEffect(() => {
        if (status !== "authenticated") return;
        
        const handleActivity = () => {
            const now = Date.now();
            const delta = now - lastEventTimeRef.current;
            
            if (delta < IDLE_TIMEOUT) {
                // User was active recently, add the delta
                activeTimeRef.current += delta;
            }
            lastEventTimeRef.current = now;
            
            // Check if we should report
            if (activeTimeRef.current >= REPORT_INTERVAL) {
                // Convert accumulated ms to hours (fractional)
                const hours = activeTimeRef.current / (1000 * 60 * 60);
                activeTimeRef.current = 0; // reset local accumulator
                
                // Fire and forget
                fetch("/api/user/velocity", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        date: new Date().toISOString().split("T")[0], 
                        value: hours 
                    })
                }).catch(console.error);
            }
        };

        const events = ["mousemove", "keydown", "click", "scroll"];
        let timeout: any;
        const throttledHandler = () => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    handleActivity();
                    timeout = null;
                }, 2000); // Only run the math once every 2 seconds
            }
        };

        events.forEach(e => window.addEventListener(e, throttledHandler, { passive: true }));
        
        // Also run an interval to catch if user is just reading/watching (acting as a heartbeat if they are considered active)
        const interval = setInterval(() => {
            const now = Date.now();
            if (now - lastEventTimeRef.current < IDLE_TIMEOUT) {
                // Still considered active from the last event
                handleActivity();
            }
        }, 10000);

        return () => {
            events.forEach(e => window.removeEventListener(e, throttledHandler));
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [status]);

    return null; // Silent component
}
