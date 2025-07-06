#!/bin/bash

# Create the project structure
mkdir -p app/{\(customer\)/{book,confirmation,register,workshops},components,lib,providers,store,styles}

# Create the main layout file
cat > app/layout.tsx << 'EOL'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/providers/ReduxProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workshop Booking System',
  description: 'Book your favorite workshops',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <ToastContainer position="bottom-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
EOL

# Create the workshop list page
cat > app/\(customer\)/workshops/page.tsx << 'EOL'
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
EOL

# Create the WorkshopCard component
cat > components/WorkshopCard.tsx << 'EOL'
'use client';

import Link from 'next/link';
import { Workshop } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users } from 'lucide-react';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const getStatusBadge = () => {
    const totalSlots = workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0);
    const percentageFilled = ((workshop.maxCapacity - totalSlots) / workshop.maxCapacity) * 100;

    if (percentageFilled >= 80) {
      return <Badge variant="warning">Almost Full</Badge>;
    } else if (percentageFilled === 100) {
      return <Badge variant="destructive">Sold Out</Badge>;
    } else {
      return <Badge variant="success">Available</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{workshop.title}</CardTitle>
            <CardDescription>{workshop.description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{new Date(workshop.date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>
            {workshop.maxCapacity - workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0)} / {workshop.maxCapacity}
          </span>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Available Time Slots:
          </h3>
          <ul className="space-y-2">
            {workshop.timeSlots.map((slot) => (
              <li key={slot.id} className="flex justify-between items-center">
                <span className="text-sm">
                  {slot.startTime} - {slot.endTime} ({slot.availableSpots} spots left)
                </span>
                <Link href={`/book/${workshop.id}?slotId=${slot.id}`}>
                  <Button size="sm">Book Now</Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopCard;
EOL

# Create the booking page
mkdir -p app/\(customer\)/book/\[workshopId\]
cat > app/\(customer\)/book/\[workshopId\]/page.tsx << 'EOL'
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

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
  
  const workshopId = Number(params.workshopId);
  const timeSlotId = Number(searchParams.get('slotId'));
  
  const { workshops } = useAppSelector((state) => state.workshops);
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
      
      toast({
        title: 'Booking Successful',
        description: 'Your workshop booking has been confirmed.',
      });

      router.push(`/confirmation?bookingId=${result.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

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
            <span className="text-sm">{new Date(workshop.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{timeSlot.startTime} - {timeSlot.endTime}</span>
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
EOL

# Create the confirmation page
cat > app/\(customer\)/confirmation/page.tsx << 'EOL'
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
EOL

# Create the Navbar component
cat > components/Navbar.tsx << 'EOL'
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold">
          Workshop Booking
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant={pathname === '/workshops' ? 'default' : 'ghost'}
          >
            <Link href="/workshops">Workshops</Link>
          </Button>
          <Button
            asChild
            variant={pathname === '/register' ? 'default' : 'ghost'}
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
EOL

# Create the Redux provider
cat > providers/ReduxProvider.tsx << 'EOL'
'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
EOL

# Create the store files
mkdir -p store
cat > store/store.ts << 'EOL'
import { configureStore } from '@reduxjs/toolkit';
import workshopReducer from './workshopSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      workshops: workshopReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
EOL

cat > store/workshopSlice.ts << 'EOL'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface WorkshopState {
  workshops: Workshop[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WorkshopState = {
  workshops: [],
  status: 'idle',
  error: null,
};

export const fetchWorkshops = createAsyncThunk(
  'workshops/fetchWorkshops',
  async () => {
    const response = await axios.get('/api/workshops');
    return response.data;
  }
);

const workshopSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workshops = action.payload;
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch workshops';
      });
  },
});

export default workshopSlice.reducer;
EOL

# Create the types file
mkdir -p lib
cat > lib/types.ts << 'EOL'
export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  availableSpots: number;
}

export interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  maxCapacity: number;
  timeSlots: TimeSlot[];
}
EOL

# Create the utility files
cat > lib/toast.ts << 'EOL'
'use client';

import { toast } from '@/components/ui/use-toast';

export function showErrorToast(message: string) {
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
}

export function showSuccessToast(message: string) {
  toast({
    title: 'Success',
    description: message,
  });
}
EOL

cat > lib/api.ts << 'EOL'
export async function handleApiError(error: unknown) {
  let message = 'An unexpected error occurred';
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (isApiError(error)) {
    message = error.response?.data?.message || error.message;
  }

  showErrorToast(message);
  return message;
}

function isApiError(error: unknown): error is { response: { data: { message: string } }; message: string } {
  return typeof error === 'object' && error !== null && ('response' in error || 'message' in error);
}
EOL

# Create the WorkshopSkeleton component
cat > components/WorkshopSkeleton.tsx << 'EOL'
'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function WorkshopSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
EOL

echo "Workshop Booking System file structure created successfully!"