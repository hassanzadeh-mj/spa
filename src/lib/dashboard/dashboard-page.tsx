'use client';

import { useEffect, useState } from 'react';

interface Metric {
    label: string;
    value: number;
    unit: string;
}

interface Server {
    id: string;
    name: string;
    status: string;
}

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [servers, setServers] = useState<Server[]>([]);

    useEffect(() => {
        const fetchMetrics = () => {
            setMetrics([
                { label: 'استفاده پردازنده', value: Math.random() * 100, unit: '%' },
                { label: 'استفاده حافظه', value: Math.random() * 100, unit: '%' },
                { label: 'استفاده فضای ذخیره‌سازی', value: 250 + Math.random() * 100, unit: 'گیگابایت' },
            ]);
        };

        const fetchServers = async () => {
            const res = await fetch('/api/servers');
            const data = await res.json();
            setServers(data);
        };

        fetchMetrics();
        fetchServers();
        const interval = setInterval(() => {
            fetchMetrics();
            fetchServers();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 space-y-8 rtl">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-foreground font-sans">نمای کلی داشبورد</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="bg-card border border-border shadow-sm p-4 rounded-lg hover:shadow-md transition-all duration-200"
                        >
                            <h2 className="text-lg font-semibold mb-2 text-foreground font-sans">{metric.label}</h2>
                            <p className="text-2xl font-bold text-foreground">
                                <span className="number">{metric.value.toFixed(1)}</span> <span className="text-sm text-muted-foreground">{metric.unit}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2 text-foreground font-sans">کل سرورهای فعال</h2>
                <p className="text-lg text-foreground font-sans">
                    {servers.filter(s => s.status === 'active').length} فعال از {servers.length} کل
                </p>
            </div>
        </div>
    );
}