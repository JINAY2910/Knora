export default function DashboardHeader() {
    return (
        <header className="h-20 flex items-center justify-between px-8 bg-cream editorial-border-b z-10 sticky top-0">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-xl font-bold text-charcoal">My Subjects</h1>
                <p className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">
                    Computer Science • Semester 4
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-charcoal/30">
                        <span className="material-symbols-outlined text-[18px]">search</span>
                    </span>
                    <input
                        className="w-64 pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-sm focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none placeholder-charcoal/40 text-charcoal transition-all"
                        placeholder="Search topics, concepts..."
                        type="text"
                    />
                </div>

                {/* Streak Indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-sm">
                    <span className="material-symbols-outlined text-[18px] text-crimson">
                        local_fire_department
                    </span>
                    <span className="text-sm font-semibold text-charcoal">12 Day Streak</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-charcoal hover:text-crimson transition-colors">
                    <span className="material-symbols-outlined text-[22px]">notifications</span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson rounded-full"></span>
                </button>
            </div>
        </header>
    );
}
