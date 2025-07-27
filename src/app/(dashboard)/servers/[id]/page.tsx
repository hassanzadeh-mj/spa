'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
    const router = useRouter();
    const [server, setServer] = useState<ServerDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

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

    const handleServerAction = async (action: string) => {
        if (!server) return;
        
        setActionLoading(action);
        try {
            // فراخوانی API برای تغییر وضعیت سرور
            const response = await fetch(`/api/servers/${server.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'خطا در انجام عملیات');
            }
            
            // به‌روزرسانی وضعیت سرور
            setServer(data.server);
            
            // نمایش پیام موفقیت
            alert(`عملیات ${getActionText(action)} با موفقیت انجام شد`);
            
            // برای restart، بعد از 2 ثانیه وضعیت را به‌روزرسانی کن
            if (action === 'restart') {
                setTimeout(async () => {
                    try {
                        const refreshResponse = await fetch(`/api/servers/${server.id}`);
                        if (refreshResponse.ok) {
                            const refreshData = await refreshResponse.json();
                            setServer(refreshData);
                        }
                    } catch (error) {
                        console.error('Error refreshing server status:', error);
                    }
                }, 2000);
            }
            
        } catch (error) {
            console.error('Error performing server action:', error);
            alert(error instanceof Error ? error.message : 'خطا در انجام عملیات');
        } finally {
            setActionLoading(null);
        }
    };

    const getActionText = (action: string) => {
        switch (action) {
            case 'start':
                return 'راه‌اندازی';
            case 'stop':
                return 'توقف';
            case 'restart':
                return 'راه‌اندازی مجدد';
            case 'logs':
                return 'مشاهده لاگ‌ها';
            default:
                return action;
        }
    };

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

    const isActionDisabled = (action: string) => {
        if (!server) return true;
        
        switch (action) {
            case 'start':
                return server.status === 'active' || server.status === 'restarting';
            case 'stop':
                return server.status === 'stopped' || server.status === 'restarting';
            case 'restart':
                return server.status === 'stopped' || server.status === 'restarting';
            default:
                return false;
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
                <div className="flex gap-4 flex-wrap">
                    <button 
                        onClick={() => handleServerAction('start')}
                        disabled={isActionDisabled('start') || actionLoading === 'start'}
                        className={`px-4 py-2 rounded transition-colors font-medium ${
                            isActionDisabled('start') 
                                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                    >
                        {actionLoading === 'start' ? 'در حال راه‌اندازی...' : 'راه‌اندازی سرور'}
                    </button>
                    
                    <button 
                        onClick={() => handleServerAction('stop')}
                        disabled={isActionDisabled('stop') || actionLoading === 'stop'}
                        className={`px-4 py-2 rounded transition-colors font-medium ${
                            isActionDisabled('stop') 
                                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                                : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        }`}
                    >
                        {actionLoading === 'stop' ? 'در حال توقف...' : 'توقف سرور'}
                    </button>
                    
                    <button 
                        onClick={() => handleServerAction('restart')}
                        disabled={isActionDisabled('restart') || actionLoading === 'restart'}
                        className={`px-4 py-2 rounded transition-colors font-medium ${
                            isActionDisabled('restart') 
                                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                                : 'bg-yellow-600 text-white hover:bg-yellow-700'
                        }`}
                    >
                        {actionLoading === 'restart' ? 'در حال راه‌اندازی مجدد...' : 'راه‌اندازی مجدد'}
                    </button>
                    
                    <button 
                        onClick={() => handleServerAction('logs')}
                        disabled={actionLoading === 'logs'}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors font-medium"
                    >
                        {actionLoading === 'logs' ? 'در حال بارگذاری...' : 'مشاهده لاگ‌ها'}
                    </button>
                </div>
            </div>
        </div>
    );
} 