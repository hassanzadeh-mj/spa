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
                { label: 'CPU Usage', value: Math.random() * 100, unit: '%' },
                { label: 'Memory Usage', value: Math.random() * 100, unit: '%' },
                { label: 'Storage Usage', value: 250 + Math.random() * 100, unit: 'GB' },
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
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="bg-white dark:bg-gray-800 shadow p-4 rounded border border-gray-200 dark:border-gray-700"
                        >
                            <h2 className="text-lg font-semibold mb-2">{metric.label}</h2>
                            <p className="text-2xl font-bold">
                                {metric.value.toFixed(1)} <span className="text-sm">{metric.unit}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Total Active Servers</h2>
                <p className="text-lg">{servers.filter(s => s.status === 'active').length} active of {servers.length} total</p>
            </div>
        </div>
    );
}