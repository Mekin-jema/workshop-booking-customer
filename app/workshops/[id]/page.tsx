import React from 'react';
import WorkshopDetailPage from '@/components/workshops'


interface PageProps {
    params: Promise<{ id: string }>;
}



const page = async ({ params }: PageProps) => {
    const resolvedParams = await params;
    return (
        <div>
            <WorkshopDetailPage params={resolvedParams} />
        </div>
    )
}

export default page








// /app/verify-email/[token]/page.tsx

