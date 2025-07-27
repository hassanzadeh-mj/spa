'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Server {
    id: string;
    name: string;
    status: string;
    ip: string;
}

export default function ServersPage() {
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

    return (
        <div className="p-6 space-y-4 rtl">
            <h1 className="text-2xl font-bold text-foreground font-sans">سرورها</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servers.map((server) => (
                    <div key={server.id} className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-foreground font-sans">{server.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                                {getStatusText(server.status)}
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-4 font-sans">آدرس IP: {server.ip}</p>
                        <div className="flex gap-2">
                            <Link 
                                href={`/servers/${server.id}`}
                                className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-medium"
                            >
                                مدیریت
                            </Link>
                            <Link 
                                href={`/servers/${server.id}`}
                                className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors font-medium"
                            >
                                جزئیات
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 