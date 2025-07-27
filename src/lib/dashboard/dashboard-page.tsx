'use client';

import { useEffect, useState } from 'react';
import { 
    LineChart, 
    Line, 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    PieChart, 
    Pie, 
    Cell,
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import D3Gauge from '@/components/d3-gauge';

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

interface ChartData {
    name: string;
    value: number;
    fill?: string;
}

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [servers, setServers] = useState<Server[]>([]);
    const [cpuHistory, setCpuHistory] = useState<ChartData[]>([]);
    const [memoryHistory, setMemoryHistory] = useState<ChartData[]>([]);
    const [serverStatusData, setServerStatusData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchMetrics = () => {
            const newMetrics = [
                { label: 'استفاده پردازنده', value: Math.random() * 100, unit: '%' },
                { label: 'استفاده حافظه', value: Math.random() * 100, unit: '%' },
                { label: 'استفاده فضای ذخیره‌سازی', value: 250 + Math.random() * 100, unit: 'گیگابایت' },
            ];
            setMetrics(newMetrics);

            // به‌روزرسانی تاریخچه CPU
            const now = new Date();
            const timeStr = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
            
            setCpuHistory(prev => {
                const newData = [...prev, { name: timeStr, value: newMetrics[0].value }];
                return newData.slice(-10); // نگه داشتن 10 نقطه آخر
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
            
            // آماده‌سازی داده‌های وضعیت سرورها
            const statusCounts = data.reduce((acc: any, server: Server) => {
                acc[server.status] = (acc[server.status] || 0) + 1;
                return acc;
            }, {});
            
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

    return (
        <div className="p-6 space-y-8 rtl">
            <h1 className="text-2xl font-bold text-foreground font-sans">نمای کلی داشبورد</h1>

            {/* D3 Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <D3Gauge 
                        value={metrics[0]?.value || 0}
                        maxValue={100}
                        title="پردازنده"
                        color="#3b82f6"
                        size={180}
                    />
                </div>
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <D3Gauge 
                        value={metrics[1]?.value || 0}
                        maxValue={100}
                        title="حافظه"
                        color="#10b981"
                        size={180}
                    />
                </div>
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <D3Gauge 
                        value={metrics[2]?.value || 0}
                        maxValue={1000}
                        title="فضای ذخیره‌سازی"
                        color="#8b5cf6"
                        size={180}
                    />
                </div>
            </div>

            {/* نمودار خطی CPU و Memory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">تاریخچه استفاده پردازنده</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cpuHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#9ca3af"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#9ca3af"
                                fontSize={12}
                                domain={[0, 100]}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#f9fafb'
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">تاریخچه استفاده حافظه</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={memoryHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#9ca3af"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#9ca3af"
                                fontSize={12}
                                domain={[0, 100]}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#f9fafb'
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#10b981" 
                                fill="#10b981"
                                fillOpacity={0.3}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* نمودار میله‌ای منابع */}
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">استفاده منابع سیستم</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                            dataKey="label" 
                            stroke="#9ca3af"
                            fontSize={12}
                        />
                        <YAxis 
                            stroke="#9ca3af"
                            fontSize={12}
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb'
                            }}
                            formatter={(value: number, name: string) => [
                                `${value.toFixed(1)} ${name === 'value' ? 'واحد' : ''}`, 
                                'مقدار'
                            ]}
                        />
                        <Bar 
                            dataKey="value" 
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* نمودار دایره‌ای وضعیت سرورها */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">وضعیت سرورها</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={serverStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {serverStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#f9fafb'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* آمار کلی */}
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">آمار کلی</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-foreground font-medium">کل سرورها</span>
                            <span className="text-2xl font-bold text-primary number">{servers.length}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-foreground font-medium">سرورهای فعال</span>
                            <span className="text-2xl font-bold text-green-600 number">
                                {servers.filter(s => s.status === 'active').length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-foreground font-medium">سرورهای متوقف</span>
                            <span className="text-2xl font-bold text-red-600 number">
                                {servers.filter(s => s.status === 'stopped').length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-foreground font-medium">در حال راه‌اندازی مجدد</span>
                            <span className="text-2xl font-bold text-yellow-600 number">
                                {servers.filter(s => s.status === 'restarting').length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}