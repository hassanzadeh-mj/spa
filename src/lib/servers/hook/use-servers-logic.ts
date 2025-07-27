'use client';

import { useState, useEffect } from 'react';
import { Server } from "@/lib/servers/type";

export function useServersLogic() {
    const [servers, setServers] = useState<Server[]>([]);

    useEffect(() => {
        const fetchServers = async () => {
            const res = await fetch('/api/servers');
            const data = await res.json();
            setServers(data);
        };
        fetchServers();
    }, []);

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

    return {
        servers,
        getStatusColor,
        getStatusText
    };
}