'use client';

import { useEffect, useState } from 'react';
import { ChartData, Metric, Server } from "@/lib/dashboard/type";

export function useDashboardLogic() {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [servers, setServers] = useState<Server[]>([]);
    const [cpuHistory, setCpuHistory] = useState<ChartData[]>([]);
    const [memoryHistory, setMemoryHistory] = useState<ChartData[]>([]);
    const [serverStatusData, setServerStatusData] = useState<ChartData[]>([]);

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'فعال';
            case 'stopped':
                return 'متوقف';
            case 'restarting':
                return 'در حال راه‌اندازی مجدد';
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return '#10b981';
            case 'stopped':
                return '#ef4444';
            case 'restarting':
                return '#f59e0b';
            default:
                return '#6b7280';
        }
    };

    const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6b7280'];

    useEffect(() => {
        const fetchMetrics = () => {
            const newMetrics = [
                { label: 'استفاده پردازنده', value: Math.random() * 100, unit: '%' },
                { label: 'استفاده حافظه', value: Math.random() * 100, unit: '%' },
                { label: 'استفاده فضای ذخیره‌سازی', value: 250 + Math.random() * 100, unit: 'گیگابایت' },
            ];
            setMetrics(newMetrics);

            const now = new Date();
            const timeStr = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

            setCpuHistory(prev => {
                const newData = [...prev, { name: timeStr, value: newMetrics[0].value }];
                return newData.slice(-10);
            });

            setMemoryHistory(prev => {
                const newData = [...prev, { name: timeStr, value: newMetrics[1].value }];
                return newData.slice(-10);
            });
        };

        const fetchServers = async () => {
            const res = await fetch('/api/servers');
            const data = await res.json();
            setServers(data);

            const statusCounts = data.reduce((acc: Record<string, number>, server: Server) => {
                acc[server.status] = (acc[server.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const statusData = Object.entries(statusCounts).map(([status, count]) => ({
                name: getStatusText(status),
                value: count as number,
                fill: getStatusColor(status)
            }));

            setServerStatusData(statusData);
        };

        fetchMetrics();
        fetchServers();
        const interval = setInterval(() => {
            fetchMetrics();
            fetchServers();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return {
        metrics,
        servers,
        cpuHistory,
        memoryHistory,
        serverStatusData,
        COLORS,
        getStatusText,
        getStatusColor
    };
}