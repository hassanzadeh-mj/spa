import { NextRequest, NextResponse } from 'next/server';

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

export async function generateStaticParams() {
    return servers.map((server) => ({
        id: server.id,
    }));
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const server = servers.find(s => s.id === id);

    if (!server) {
        return NextResponse.json(
            { error: 'Server not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(server);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { action } = body;
        
        const serverIndex = servers.findIndex(s => s.id === id);
        
        if (serverIndex === -1) {
            return NextResponse.json(
                { error: 'Server not found' },
                { status: 404 }
            );
        }
        
        const server = servers[serverIndex];
        
        // تغییر وضعیت سرور بر اساس عملیات
        switch (action) {
            case 'start':
                if (server.status === 'active') {
                    return NextResponse.json(
                        { error: 'Server is already active' },
                        { status: 400 }
                    );
                }
                server.status = 'active';
                server.metrics.cpu = Math.floor(Math.random() * 50) + 20;
                server.metrics.memory = Math.floor(Math.random() * 40) + 50;
                break;
                
            case 'stop':
                if (server.status === 'stopped') {
                    return NextResponse.json(
                        { error: 'Server is already stopped' },
                        { status: 400 }
                    );
                }
                server.status = 'stopped';
                server.metrics.cpu = 0;
                server.metrics.memory = 0;
                break;
                
            case 'restart':
                if (server.status === 'stopped') {
                    return NextResponse.json(
                        { error: 'Cannot restart a stopped server' },
                        { status: 400 }
                    );
                }
                server.status = 'restarting';
                // بعد از 2 ثانیه به active تغییر می‌کند
                setTimeout(() => {
                    server.status = 'active';
                    server.metrics.cpu = Math.floor(Math.random() * 50) + 20;
                    server.metrics.memory = Math.floor(Math.random() * 40) + 50;
                }, 2000);
                break;
                
            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }
        
        return NextResponse.json({
            success: true,
            message: `Server ${action} successful`,
            server: server
        });
        
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
