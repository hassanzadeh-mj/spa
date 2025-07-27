'use client';

export default function ResourcesPage() {
    const resources = [
        { type: 'CPU', total: 100, used: 76 },
        { type: 'Memory', total: 256, used: 190 },
        { type: 'Storage', total: 1000, used: 820 },
    ];

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-foreground font-sans">Resources Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((res) => {
                    const percent = Math.round((res.used / res.total) * 100);
                    return (
                        <div key={res.type} className="bg-card border border-border p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <h2 className="text-lg font-semibold mb-2 text-foreground font-sans">{res.type}</h2>
                            <p className="text-sm mb-1 text-muted-foreground font-sans">
                                {res.used} / {res.total} {res.type === 'Storage' ? 'GB' : 'units'}
                            </p>
                            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-primary h-4 rounded-full transition-all duration-300"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground font-sans">{percent}% used</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 