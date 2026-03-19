"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import HeatmapWidget from "@/components/dashboard/HeatmapWidget";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editDept, setEditDept] = useState("");
    const [editSkills, setEditSkills] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/user/profile");
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                    setEditDept(data.department || "");
                    setEditSkills((data.skills || []).join(", "));
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };

        if (status === "authenticated") {
            fetchProfile();
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [status]);

    const handleSave = async () => {
        const newSkills = editSkills.split(",").map(s => s.trim()).filter(Boolean);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ department: editDept, skills: newSkills }),
            });
            if (res.ok) {
                setProfile({ ...profile, department: editDept, skills: newSkills });
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="flex-1 bg-[#f8f7f4] min-h-screen text-charcoal flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-none h-10 w-10 border-4 border-charcoal border-t-crimson"></div>
                    <p className="text-sm font-black uppercase tracking-widest text-charcoal">Querying Identity</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex-1 bg-[#f8f7f4] min-h-screen flex items-center justify-center">
                <p className="font-bold text-charcoal uppercase tracking-widest">Access Denied.</p>
            </div>
        );
    }

    return (
        <main className="flex-1 bg-[#f8f7f4] h-screen relative overflow-y-auto overflow-x-hidden">
            {/* Background Structural Decor */}
            <div className="absolute top-0 w-full h-80 bg-charcoal border-b-[6px] border-crimson -z-0"></div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <header className="mb-12 flex flex-col items-center text-center text-white">
                    <span className="material-symbols-outlined text-5xl mb-4 text-crimson">fingerprint</span>
                    <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 shadow-black text-white/95">Master Identity</h1>
                    <p className="text-white/70 font-bold tracking-widest uppercase text-sm max-w-lg mx-auto border-t border-white/20 pt-4">Configuration matrix & Analytics Hub</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
                    {/* Identity Card */}
                    <div className="lg:col-span-4 bg-white border-4 border-charcoal shadow-[8px_8px_0px_0px_rgba(55,56,51,1)] flex flex-col relative h-fit">
                        {/* Status bar */}
                        <div className="w-full h-8 bg-charcoal flex items-center px-4 border-b-4 border-charcoal shrink-0">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-crimson"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-none border-4 border-charcoal bg-crimson flex items-center justify-center text-white text-5xl font-black mb-6 shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] overflow-hidden shrink-0 -mt-20">
                                {profile?.image ? <img src={profile.image} alt="Profile" className="w-full h-full object-cover" /> : session?.user?.name?.charAt(0) || "U"}
                            </div>
                            <h2 className="text-2xl font-bold text-charcoal mb-1 text-center">{profile?.name || session?.user?.name}</h2>
                            <p className="text-gray-500 text-sm mb-6 text-center">{profile?.email || session?.user?.email}</p>

                            <div className="w-full border-b-2 border-dashed border-charcoal/20 mb-6"></div>

                            {isEditing ? (
                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Department</label>
                                        <input 
                                            type="text" 
                                            value={editDept}
                                            onChange={(e) => setEditDept(e.target.value)}
                                            className="w-full border-2 border-charcoal p-2 text-sm font-bold focus:outline-none focus:border-crimson shadow-sm"
                                            placeholder="e.g. Computer Science"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Skills (comma separated)</label>
                                        <input 
                                            type="text" 
                                            value={editSkills}
                                            onChange={(e) => setEditSkills(e.target.value)}
                                            className="w-full border-2 border-charcoal p-2 text-sm font-bold focus:outline-none focus:border-crimson shadow-sm"
                                            placeholder="Java, React, SQL"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <button onClick={handleSave} className="flex-1 bg-charcoal text-white text-xs font-black px-4 py-3 hover:bg-crimson transition-colors uppercase tracking-widest border-2 border-transparent">Save</button>
                                        <button onClick={() => setIsEditing(false)} className="flex-1 bg-white border-2 border-charcoal text-charcoal text-xs font-black px-4 py-3 hover:bg-cream transition-colors uppercase tracking-widest">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Department</label>
                                        <p className="font-bold text-charcoal bg-gray-50 p-3 border-2 border-charcoal/10 min-h-[46px] flex items-center">{profile?.department || <span className="text-gray-400 italic font-normal text-sm">Not specified</span>}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Skills</label>
                                        <div className="flex flex-wrap gap-2 mt-2 min-h-[46px] p-1 border border-transparent">
                                            {profile?.skills && profile.skills.length > 0 ? (
                                                profile.skills.map((skill: string, idx: number) => (
                                                    <span key={idx} className="bg-white text-charcoal border-2 border-charcoal px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-[2px_2px_0px_0px_rgba(55,56,51,1)]">{skill}</span>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-400 italic font-medium">No skills added</p>
                                            )}
                                        </div>
                                    </div>
                                    <button onClick={() => setIsEditing(true)} className="w-full mt-6 bg-white border-2 border-charcoal text-charcoal text-xs font-black px-4 py-4 hover:bg-cream transition-all uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                                        EDIT CONFIGURATION
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="w-full bg-cream border-t-4 border-charcoal mt-auto">
                            <button 
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full flex items-center justify-center gap-3 text-crimson font-black px-4 py-5 hover:bg-charcoal hover:text-white transition-all uppercase tracking-widest"
                            >
                                <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
                                Terminate Session
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Activity & Progress */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Heatmap Widget */}
                        <div className="w-full">
                            <HeatmapWidget />
                        </div>

                        {/* Courses / Progress */}
                        <div className="bg-white border-4 border-charcoal shadow-[8px_8px_0px_0px_rgba(55,56,51,1)] p-8 lg:p-10 relative overflow-hidden">
                            {/* Accent graphics */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/5 rounded-bl-full -z-0"></div>
                            
                            <div className="flex items-center gap-4 mb-8 border-b-4 border-charcoal pb-6 relative z-10">
                                <span className="w-12 h-12 bg-cream border-2 border-charcoal shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px] text-charcoal">analytics</span>
                                </span>
                                <h3 className="text-3xl font-black text-charcoal uppercase tracking-tighter">Certified Progress</h3>
                            </div>
                            
                            {Object.keys(profile?.progress || {}).length > 0 ? (
                                <div className="space-y-6">
                                    {Object.entries(profile.progress).map(([courseId, progressValue]) => (
                                        <div key={courseId} className="group cursor-pointer">
                                            <div className="flex justify-between text-sm font-black text-charcoal mb-2 uppercase tracking-wide">
                                                <span>{courseId.replace(/-/g, " ")}</span>
                                                <span className="text-crimson font-bold">{progressValue as number}%</span>
                                            </div>
                                            <div className="w-full h-6 bg-cream border-2 border-charcoal rounded-none overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(55,56,51,0.2)]">
                                                <div 
                                                    className="h-full bg-charcoal transition-all duration-1000 ease-out" 
                                                    style={{ width: `${progressValue}%` }}
                                                ></div>
                                                {/* Retro styled glare/highlight inline */}
                                                <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 px-6 border-4 border-dashed border-charcoal/20 bg-[#f8f7f4] rounded-none">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white border-4 border-charcoal rounded-none mb-6 shadow-[4px_4px_0px_0px_rgba(55,56,51,1)]">
                                        <span className="material-symbols-outlined text-charcoal text-4xl">inventory_2</span>
                                    </div>
                                    <h4 className="text-charcoal font-black text-2xl mb-2 tracking-tighter uppercase">No Courses Active</h4>
                                    <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto leading-relaxed">
                                        You haven't begun any structured learning modules yet. Head to your Dashboard to initiate a module and construct your progress tree.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
