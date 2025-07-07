'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="max-w-md mx-auto py-8">
      <Card className="border-green-500">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Thank you for your booking. Your booking reference is:
          </p>
          <p className="font-mono text-lg font-bold">{bookingId}</p>
          <p className="text-muted-foreground">
            We've sent a confirmation email with all the details.
          </p>
          <Link href="/workshops">
            <Button className="mt-4">Back to Workshops</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
