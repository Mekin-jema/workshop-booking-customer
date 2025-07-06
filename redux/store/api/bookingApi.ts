import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store'; // Adjust the import path as needed to point to your store definition
import { Booking, BookingStatus, CreateBookingDto } from '@/types';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], void>({
      query: () => 'bookings',
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation<Booking, CreateBookingDto>({
      query: (body) => ({
        url: 'bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),
    updateBookingStatus: builder.mutation<Booking, { id: string; status: BookingStatus }>({
      query: ({ id, ...patch }) => ({
        url: `bookings/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
} = bookingApi;
