'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchWorkshops } from '@/store/workshopSlice';
import WorkshopCard from '@/components/WorkshopCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function WorkshopList() {
  const dispatch = useAppDispatch();
  const { workshops, status, error } = useAppSelector((state) => state.workshops);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWorkshops());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Available Workshops</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Available Workshops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
  );
}
