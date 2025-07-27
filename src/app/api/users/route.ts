
import { NextResponse } from 'next/server';

export async function GET() {
    const users = [
        { id: '1', name: 'Alice Admin', role: 'admin', email: 'alice@example.com' },
        { id: '2', name: 'Bob Manager', role: 'manager', email: 'bob@example.com' },
        { id: '3', name: 'Charlie User', role: 'user', email: 'charlie@example.com' },
        { id: '4', name: 'Dana Manager', role: 'manager', email: 'dana@example.com' },
    ];

    return NextResponse.json(users);
}
