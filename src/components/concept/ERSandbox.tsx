"use client";
import { useState } from "react";

export default function ERSandbox() {
    const [connections, setConnections] = useState<string[]>([]);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleNodeClick = (nodeId: string) => {
        if (!selectedNode) {
            setSelectedNode(nodeId);
            setError("");
        } else {
            if (selectedNode === nodeId) {
                setSelectedNode(null); // Deselect
                return;
            }

            // Attempt connection
            const newConnection = [selectedNode, nodeId].sort().join("-");
            
            if (connections.includes(newConnection)) {
                setError("Connection already exists!");
            } else if (newConnection === "driver-rider") {
                setError("SYSTEM CRASH! Many-to-Many relationship created without a junction table.");
                setConnections([]);
            } else {
                setConnections([...connections, newConnection]);
                setError("");
                
                // Check win condition (driver-trip and rider-trip)
                if (
                    ([...connections, newConnection].includes("driver-trip")) &&
                    ([...connections, newConnection].includes("rider-trip"))
                ) {
                    setSuccess(true);
                }
            }
            setSelectedNode(null);
        }
    };

    if (success) {
        return (
            <div className="w-full h-[400px] bg-green-500/10 border-2 border-green-500 rounded-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">task_alt</span>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Schema Optimized!</h3>
                <p className="text-green-600 mb-6 max-w-md">
                    Excellent work! You successfully used the 'Trip' entity as a junction table to resolve the N:M relationship between Drivers and Riders. Your database is ready for millions of users.
                </p>
                <button 
                    onClick={() => { setSuccess(false); setConnections([]); }}
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(55,56,51,1)] transition-all"
                >
                    Reset Sandbox
                </button>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border-2 border-charcoal rounded-xl shadow-[8px_8px_0px_0px_rgba(55,56,51,1)] overflow-hidden mb-12 flex flex-col">
            <div className="bg-charcoal text-white px-6 py-4 flex justify-between items-center border-b-2 border-charcoal">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">architecture</span>
                    <h3 className="font-bold text-lg tracking-wide uppercase">Architect Sandbox: Live</h3>
                </div>
                <div className="text-xs px-3 py-1 bg-white/10 rounded font-mono">
                    Select two nodes to connect them
                </div>
            </div>
            
            <div className="p-10 flex flex-col items-center justify-center min-h-[400px] bg-slate-50 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 border-2 border-red-500 text-red-700 px-6 py-2 rounded font-bold shadow-lg z-20 animate-in slide-in-from-top-4">
                        {error}
                    </div>
                )}

                {/* SVG Connections Canvas */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                    {connections.includes("driver-rider") && (
                         <line x1="25%" y1="20%" x2="75%" y2="20%" stroke="#ef4444" strokeWidth="4" strokeDasharray="5,5" className="animate-pulse" />
                    )}
                    {connections.includes("driver-trip") && (
                         <line x1="25%" y1="20%" x2="50%" y2="80%" stroke="#3b82f6" strokeWidth="4" />
                    )}
                    {connections.includes("rider-trip") && (
                         <line x1="75%" y1="20%" x2="50%" y2="80%" stroke="#22c55e" strokeWidth="4" />
                    )}
                </svg>

                {/* Nodes */}
                <div 
                    onClick={() => handleNodeClick("driver")}
                    className={`absolute top-[10%] left-[15%] w-32 bg-white border-4 ${selectedNode === 'driver' ? 'border-blue-500 scale-110 shadow-xl' : 'border-charcoal hover:border-blue-400'} p-2 shadow-sm rounded cursor-pointer transition-all z-10`}
                >
                    <div className="bg-blue-100 font-bold text-center border-b-2 border-charcoal pb-1 mb-2">Driver</div>
                    <div className="text-xs space-y-1">
                        <div className="flex justify-between"><span>PK</span><span className="font-mono">DriverID</span></div>
                    </div>
                </div>

                <div 
                    onClick={() => handleNodeClick("rider")}
                    className={`absolute top-[10%] right-[15%] w-32 bg-white border-4 ${selectedNode === 'rider' ? 'border-green-500 scale-110 shadow-xl' : 'border-charcoal hover:border-green-400'} p-2 shadow-sm rounded cursor-pointer transition-all z-10`}
                >
                    <div className="bg-green-100 font-bold text-center border-b-2 border-charcoal pb-1 mb-2">Rider</div>
                    <div className="text-xs space-y-1">
                        <div className="flex justify-between"><span>PK</span><span className="font-mono">RiderID</span></div>
                    </div>
                </div>

                <div 
                    onClick={() => handleNodeClick("trip")}
                    className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 w-40 bg-white border-4 ${selectedNode === 'trip' ? 'border-purple-500 scale-110 shadow-xl' : 'border-charcoal hover:border-purple-400'} p-2 shadow-sm rounded cursor-pointer transition-all z-10`}
                >
                    <div className="bg-purple-100 font-bold text-center border-b-2 border-charcoal pb-1 mb-2">Trip</div>
                    <div className="text-xs space-y-1">
                        <div className="flex justify-between"><span>PK</span><span className="font-mono">TripID</span></div>
                    </div>
                </div>
            </div>
            
            <div className="bg-cream border-t-2 border-charcoal p-4 flex justify-between items-center text-sm">
                <span className="text-charcoal-light font-bold">Goal: Connect the entities safely without causing a N:M crash.</span>
                <button onClick={() => setConnections([])} className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wide">
                    Reset Canvas
                </button>
            </div>
        </div>
    );
}
