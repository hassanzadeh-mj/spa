import { NextResponse } from 'next/server';

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

const serverDetails: Record<string, ServerDetail> = {
    '1': {
        id: '1',
        name: 'Server Alpha',
        status: 'active',
        ip: '192.168.1.10',
        metrics: {
            cpu: 45,
            memory: 68,
            storage: 280,
        },
    },
    '2': {
        id: '2',
        name: 'Server Beta',
        status: 'stopped',
        ip: '192.168.1.11',
        metrics: {
            cpu: 0,
            memory: 0,
            storage: 150,
        },
    },
    '3': {
        id: '3',
        name: 'Server Gamma',
        status: 'restarting',
        ip: '192.168.1.12',
        metrics: {
            cpu: 30,
            memory: 40,
            storage: 200,
        },
    },
    '4': {
        id: '4',
        name: 'Server Delta',
        status: 'active',
        ip: '192.168.1.13',
        metrics: {
            cpu: 60,
            memory: 70,
            storage: 300,
        },
    },
};

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = context.params;
    const server = serverDetails[id];

    if (!server) {
        return new NextResponse('Server not found', { status: 404 });
    }

    return NextResponse.json(server);
}
