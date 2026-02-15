export default function Stats() {
    return (
        <div className="border-y-2 border-background-dark bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center group">
                        <div className="text-4xl font-serif font-bold text-text-main mb-1 group-hover:text-primary transition-colors duration-300">
                            50k+
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                            Students
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-4xl font-serif font-bold text-text-main mb-1 group-hover:text-primary transition-colors duration-300">
                            2.4M
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                            Questions Solved
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-4xl font-serif font-bold text-text-main mb-1 group-hover:text-primary transition-colors duration-300">
                            98%
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                            Pass Rate
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-4xl font-serif font-bold text-text-main mb-1 group-hover:text-primary transition-colors duration-300">
                            24/7
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                            AI Availability
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
