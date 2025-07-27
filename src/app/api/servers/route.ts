import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// شبیه‌سازی دیتابیس سرورها
const servers = [
    {
        id: '1',
        name: 'Web Server 1',
        status: 'active',
        ip: '192.168.1.100',
        metrics: {
            cpu: 45,
            memory: 78,
            storage: 320
        }
    },
    {
        id: '2',
        name: 'Database Server',
        status: 'active',
        ip: '192.168.1.101',
        metrics: {
            cpu: 23,
            memory: 65,
            storage: 450
        }
    },
    {
        id: '3',
        name: 'Application Server',
        status: 'stopped',
        ip: '192.168.1.102',
        metrics: {
            cpu: 0,
            memory: 0,
            storage: 280
        }
    }
];

export async function GET() {
    return NextResponse.json(servers);
}
