export type Role = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional if you don't expose it
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  availableSpots?: number;
  workshopId?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  maxCapacity: number;
  timeSlots: TimeSlot[];
  bookings?: Booking[]; // Optional depending on usage
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: number;
  customerId: number;
  workshopId: number;
  workshop?: Workshop; // Optional for detailed view
  timeSlotId:{
    startTime: string;
    endTime: string;
  }
  status: BookingStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  workshopId: number;
  timeSlotId: number;
  name: string;
  email: string;
}
