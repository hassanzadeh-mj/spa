
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const users = [
    {
        id: '1',
        name: 'علی احمدی',
        role: 'admin',
        email: 'ali@example.com',
    },
    {
        id: '2',
        name: 'فاطمه محمدی',
        role: 'manager',
        email: 'fateme@example.com',
    },
    {
        id: '3',
        name: 'حسن رضایی',
        role: 'user',
        email: 'hasan@example.com',
    },
    {
        id: '4',
        name: 'مریم کریمی',
        role: 'user',
        email: 'maryam@example.com',
    },
];

export async function GET() {
    return NextResponse.json(users);
}
