'use client';

import { useState, useEffect } from 'react';
import {ServerDetail} from "@/lib/servers/details/type";

export function useServerDetailLogic(id: string) {
    const [server, setServer] = useState<ServerDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchServerDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/servers/${id}`);
            if (!res.ok) throw new Error('خطا در دریافت اطلاعات سرور');
            const data = await res.json();
            setServer(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'خطای ناشناخته');
            console.error('Error fetching server details:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchServerDetails();
        }
    }, [id]);

    const handleServerAction = async (action: string) => {
        if (!server) return;

        setActionLoading(action);
        try {
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

            setServer(data.server);
            setError(null);

            if (action === 'restart') {
                setTimeout(async () => {
                    try {
                        await fetchServerDetails();
                    } catch (error) {
                        console.error('Error refreshing server status:', error);
                    }
                }, 2000);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'خطای ناشناخته');
            console.error('Error performing server action:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const getActionText = (action: string) => {
        switch (action) {
            case 'start': return 'راه‌اندازی';
            case 'stop': return 'توقف';
            case 'restart': return 'راه‌اندازی مجدد';
            case 'logs': return 'مشاهده لاگ‌ها';
            default: return action;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
            case 'stopped': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
            case 'restarting': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
            default: return 'text-muted-foreground bg-muted';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'فعال';
            case 'stopped': return 'متوقف';
            case 'restarting': return 'در حال راه‌اندازی مجدد';
            default: return status;
        }
    };

    const isActionDisabled = (action: string) => {
        if (!server) return true;
        switch (action) {
            case 'start': return server.status === 'active' || server.status === 'restarting';
            case 'stop': return server.status === 'stopped' || server.status === 'restarting';
            case 'restart': return server.status === 'stopped' || server.status === 'restarting';
            default: return false;
        }
    };

    return {
        server,
        loading,
        actionLoading,
        error,
        handleServerAction,
        getActionText,
        getStatusColor,
        getStatusText,
        isActionDisabled
    };
}