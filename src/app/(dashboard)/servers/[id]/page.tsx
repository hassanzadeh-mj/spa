import { Suspense } from 'react';
import {ServerDetailsPage} from "@/lib/servers/details";

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' }
    ];
}

export default async function ServerDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
            <ServerDetailsPage id={id} />
        </Suspense>
    );
} 