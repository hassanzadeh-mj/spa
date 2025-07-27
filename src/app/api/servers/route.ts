import { NextResponse } from 'next/server';

export async function GET() {
    const servers = [
        {
            id: '1',
            name: 'Server Alpha',
            status: 'active',
            ip: '192.168.1.10',
        },
        {
            id: '2',
            name: 'Server Beta',
            status: 'stopped',
            ip: '192.168.1.11',
        },
        {
            id: '3',
            name: 'Server Gamma',
            status: 'restarting',
            ip: '192.168.1.12',
        },
        {
            id: '4',
            name: 'Server Delta',
            status: 'active',
            ip: '192.168.1.13',
        },
    ];

    return NextResponse.json(servers);
}
