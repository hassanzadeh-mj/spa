import { Suspense } from 'react';
import ServerDetailClient from './server-detail-client';

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' }
    ];
}

export default async function ServerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
            <ServerDetailClient id={id} />
        </Suspense>
    );
} 