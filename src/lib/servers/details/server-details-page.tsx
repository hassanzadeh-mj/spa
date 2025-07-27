'use client';

import Link from 'next/link';
import {ServerDetailClientProps} from "@/lib/servers/details/type";
import {useServerDetailLogic} from "@/lib/servers/details/hook/use-server-detail-logic";

export function ServerDetailsPage({ id }: ServerDetailClientProps) {
    const {
        server,
        loading,
        actionLoading,
        error,
        handleServerAction,
        getStatusColor,
        getStatusText,
        isActionDisabled
    } = useServerDetailLogic(id);

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

    if (error || !server) {
        return (
            <div className="p-6 rtl">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-destructive mb-4 font-sans">
                        {error || 'سرور یافت نشد'}
                    </h1>
                    <Link href="/servers" className="text-primary hover:underline font-medium">
                         بازگشت به سرورها
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
                         بازگشت به سرورها
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