"use client";

import { useState, useEffect } from "react";

interface VelocityEntry {
    date: string;
    value: number; // hours (can be fractional)
}

const BrutalistDropdown = ({ value, options, onChange }: { value: number, options: { label: string, value: number }[], onChange: (val: number) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative flex-1 sm:flex-none">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 bg-[#f8f7f4] border-2 border-charcoal text-charcoal text-xs font-black uppercase tracking-widest pl-4 pr-3 py-3 focus:outline-none focus:border-crimson shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
            >
                <span>{options.find(o => o.value === value)?.label}</span>
                <span className={`material-symbols-outlined text-[18px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full right-0 sm:left-0 mt-2 min-w-[140px] bg-[#f8f7f4] border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] z-50 max-h-48 overflow-y-auto custom-scrollbar flex flex-col">
                        {options.map((opt) => (
                            <div 
                                key={opt.value}
                                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                                className={`px-4 py-3 text-xs font-black uppercase tracking-widest cursor-pointer transition-colors border-b border-charcoal/10 last:border-b-0 ${value === opt.value ? 'bg-charcoal text-white' : 'text-charcoal hover:bg-crimson hover:text-white'}`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function HeatmapWidget() {
    const [history, setHistory] = useState<VelocityEntry[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    
    // Enhance precision for display (e.g., 1.5 hrs or 20 mins)
    const formatTime = (hours: number) => {
        if (hours === 0) return "Logged in (0 hrs)";
        if (hours < 1) {
            const mins = Math.round(hours * 60);
            return `${mins} min${mins !== 1 ? 's' : ''}`;
        }
        return `${Math.round(hours * 10) / 10} hr${hours !== 1 ? 's' : ''}`;
    };

    // Generate days specifically for the selected month/year
    const generateMonthlyDays = (fetchedHistory: VelocityEntry[], month: number, year: number) => {
        const days = [];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // We get today's date purely to visually mark "Logged In" if the user has no history on today's date yet but is online.
        const todayStr = new Date().toISOString().split("T")[0];

        for (let day = 1; day <= daysInMonth; day++) {
            // Local date string format avoiding timezone shift glitches
            const d = new Date(year, month, day);
            const dateStr = [
                d.getFullYear(),
                String(d.getMonth() + 1).padStart(2, '0'),
                String(d.getDate()).padStart(2, '0')
            ].join('-');
            
            const record = fetchedHistory.find(h => h.date === dateStr);
            const value = record ? record.value : 0;
            
            // If there's a record, the user logged in. 
            const hasLoggedIn = !!record || dateStr === todayStr;
            
            let colorClass = "bg-charcoal/5 border-charcoal/10"; // Default
            if (hasLoggedIn && value === 0) colorClass = "bg-[#ffe5ea] border-charcoal/30"; // Very light pink
            if (value > 0 && value <= 1) colorClass = "bg-[#ff8a9c] border-charcoal";
            if (value > 1 && value <= 3) colorClass = "bg-[#fa2742] border-charcoal";
            if (value > 3) colorClass = "bg-[#cc1027] border-charcoal"; // darkest red
            
            days.push({
                date: dateStr,
                value,
                colorClass,
                label: d.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                dayNumber: day
            });
        }
        return days;
    };

    const [daysConfig, setDaysConfig] = useState<any[]>(() => generateMonthlyDays([], selectedMonth, selectedYear));

    // Update frontend every minute so user sees their hours climb without full page reload.
    useEffect(() => {
        const fetchVelocity = async () => {
            try {
                const res = await fetch("/api/user/velocity");
                if (res.ok) {
                    const data = await res.json();
                    if (data.learningVelocity) {
                        setHistory(data.learningVelocity);
                        setDaysConfig(generateMonthlyDays(data.learningVelocity, selectedMonth, selectedYear));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch velocity", error);
            }
        };

        fetchVelocity();
        
        const interval = setInterval(() => {
            fetchVelocity();
        }, 30000); // Refresh UI data every 30s to match tracker interval

        return () => clearInterval(interval);
    }, [selectedMonth, selectedYear]);

    // Handle Month/Year dropdown changes
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value);
        setSelectedMonth(newMonth);
        setDaysConfig(generateMonthlyDays(history, newMonth, selectedYear));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value);
        setSelectedYear(newYear);
        setDaysConfig(generateMonthlyDays(history, selectedMonth, newYear));
    };

    // Calculate options for year (Current year down to 1 year ago)
    const currentYear = new Date().getFullYear();
    const yearOptions = [currentYear, currentYear - 1];

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="bg-white p-6 md:p-8 border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(55,56,51,1)] h-fit flex flex-col gap-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <span className="w-10 h-10 border-2 border-charcoal bg-crimson flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-white">
                            grid_on
                        </span>
                    </span>
                    <h3 className="text-[17px] font-bold text-charcoal tracking-tight uppercase leading-none">
                        Learning Velocity
                    </h3>
                </div>

                <div className="flex gap-3 w-full sm:w-auto flex-1 md:flex-none justify-start sm:justify-end z-30">
                    <BrutalistDropdown 
                        value={selectedMonth}
                        options={months.map((m, idx) => ({ label: m.substring(0,3), value: idx }))}
                        onChange={(val) => {
                            setSelectedMonth(val);
                            setDaysConfig(generateMonthlyDays(history, val, selectedYear));
                        }}
                    />

                    <BrutalistDropdown 
                        value={selectedYear}
                        options={yearOptions.map(y => ({ label: String(y), value: y }))}
                        onChange={(val) => {
                            setSelectedYear(val);
                            setDaysConfig(generateMonthlyDays(history, selectedMonth, val));
                        }}
                    />
                </div>
            </div>
            
            <div className="w-full flex justify-center py-2">
                <div className="w-full max-w-sm mx-auto grid grid-cols-7 gap-1.5 sm:gap-2">
                    {daysConfig.map((day, index) => (
                        <div 
                            key={index} 
                            className={`aspect-square w-full border-2 rounded-none flex items-center justify-center font-bold text-xs sm:text-sm ${day.colorClass === 'bg-charcoal/5 border-charcoal/10' ? 'text-charcoal/40' : 'text-charcoal'} ${day.colorClass} group relative cursor-pointer hover:border-charcoal hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] transition-all`}
                        >
                            {day.dayNumber}
                            {/* Tooltip */}
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-charcoal text-white text-xs py-2 px-3 whitespace-nowrap border-2 border-charcoal shadow-[2px_2px_0px_0px_rgba(55,56,51,1)] pointer-events-none z-20 flex flex-col items-center">
                                <span className="font-bold text-crimson mb-1 uppercase tracking-wider">{formatTime(day.value)}</span>
                                <span className="text-gray-300 font-medium">{day.label}</span>
                                
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[10px] sm:text-xs text-charcoal font-bold tracking-widest uppercase pt-6 border-t border-charcoal/10">
                <span>Idle</span>
                <div className="flex gap-2">
                    <div className="w-4 h-4 bg-charcoal/5 border border-charcoal/10 rounded-[2px]" title="No Activity"></div>
                    <div className="w-4 h-4 bg-[#ffe5ea] border border-charcoal/30 rounded-[2px]" title="Logged In"></div>
                    <div className="w-4 h-4 bg-[#ff8a9c] border border-charcoal rounded-[2px]" title="Up to 1 hour"></div>
                    <div className="w-4 h-4 bg-[#fa2742] border border-charcoal rounded-[2px]" title="Up to 3 hours"></div>
                    <div className="w-4 h-4 bg-[#cc1027] border border-charcoal rounded-[2px]" title="Over 3 hours"></div>
                </div>
                <span>Grinding</span>
            </div>
        </div>
    );
}
