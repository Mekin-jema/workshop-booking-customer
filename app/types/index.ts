export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  maxCapacity: number;
  timeSlots: TimeSlot[];
  instructor: string;
  category: string;
}

export interface Booking {
  id: string;
  workshopId: string;
  timeSlotId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CreateBookingDto {
  workshopId: string;
  timeSlotId: string;
  name: string;
  email: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
