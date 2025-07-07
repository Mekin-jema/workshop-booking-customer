'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';


interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  timeSlots: TimeSlot[];
}

interface WorkshopsState {
  workshops: Workshop[];
}
// Zod schema for form validation
const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  workshopId: z.number(),
  timeSlotId: z.number(),
});

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Safely extract route params and query params
  const workshopId = Number((params as { workshopId: string }).workshopId);
  const timeSlotId = Number(searchParams.get('slotId'));



  const { workshops }: WorkshopsState = useSelector((state: { workshops: WorkshopsState }) => state.workshops);
  const workshop = workshops.find((w) => w.id === workshopId);
  const timeSlot = workshop?.timeSlots.find((ts) => ts.id === timeSlotId);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      workshopId,
      timeSlotId,
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();

      toast.success('Booking Successful', {
        description: 'Your workshop booking has been confirmed.',
      });

      router.push(`/confirmation?bookingId=${result.id}`);
    } catch (error) {
      toast.error('Booking Failed', {
        description: 'Something went wrong while booking. Please try again.',
      });
    }
  };


  // Handle invalid workshop or timeslot
  if (!workshop || !timeSlot) {
    return (
      <div className="text-center py-8">
        <p>Workshop or time slot not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workshop Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{workshop.title}</h2>
            <p className="text-sm text-muted-foreground">{workshop.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {new Date(workshop.date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {timeSlot.startTime} - {timeSlot.endTime}
            </span>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hidden Fields */}
              <input type="hidden" {...form.register('workshopId')} />
              <input type="hidden" {...form.register('timeSlotId')} />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </Form>
    </div>
  );
}
