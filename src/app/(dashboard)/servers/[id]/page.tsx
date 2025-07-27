'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ServerMetrics {
    cpu: number;
    memory: number;
    storage: number;
}

interface ServerDetail {
    id: string;
    name: string;
    status: string;
    ip: string;
    metrics: ServerMetrics;
}

export default function ServerDetailPage() {
    const params = useParams();
    const [server, setServer] = useState<ServerDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServerDetails = async () => {
            try {
                const res = await fetch(`/api/servers/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setServer(data);
                }
            } catch (error) {
                console.error('Error fetching server details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchServerDetails();
        }
    }, [params.id]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
            case 'stopped':
                return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
            case 'restarting':
                return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
            default:
                return 'text-muted-foreground bg-muted';
        }
    };

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

    if (loading) {
        return (
            <div className="p-6 rtl">
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
                    <div className="h-64 bg-muted rounded"></div>
                </div>
            </div>
        );
    }

    if (!server) {
        return (
            <div className="p-6 rtl">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-destructive mb-4 font-sans">سرور یافت نشد</h1>
                    <Link href="/servers" className="text-primary hover:underline font-medium">
                        ← بازگشت به سرورها
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 rtl">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/servers" className="text-primary hover:underline mb-2 inline-block font-medium">
                        ← بازگشت به سرورها
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground font-sans">{server.name}</h1>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(server.status)}`}>
                    {getStatusText(server.status)}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                    <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">اطلاعات سرور</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-muted-foreground font-medium">شناسه سرور</label>
                            <p className="font-medium text-foreground font-sans">{server.id}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground font-medium">آدرس IP</label>
                            <p className="font-medium text-foreground font-sans">{server.ip}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground font-medium">وضعیت</label>
                            <p className="font-medium text-foreground font-sans">{getStatusText(server.status)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                    <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">معیارهای عملکرد</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-foreground font-medium">استفاده پردازنده</span>
                                <span className="text-foreground font-medium number">{server.metrics.cpu}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${server.metrics.cpu}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-foreground font-medium">استفاده حافظه</span>
                                <span className="text-foreground font-medium number">{server.metrics.memory}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${server.metrics.memory}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-foreground font-medium">فضای استفاده شده</span>
                                <span className="text-foreground font-medium number">{server.metrics.storage} گیگابایت</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(server.metrics.storage / 500) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-lg font-semibold mb-4 text-foreground font-sans">عملیات</h2>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-medium">
                        راه‌اندازی سرور
                    </button>
                    <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors font-medium">
                        توقف سرور
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors font-medium">
                        راه‌اندازی مجدد
                    </button>
                    <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors font-medium">
                        مشاهده لاگ‌ها
                    </button>
                </div>
            </div>
        </div>
    );
} 