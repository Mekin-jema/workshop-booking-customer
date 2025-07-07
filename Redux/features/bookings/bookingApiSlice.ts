import { apiSlice } from '../api/apiSlice';

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Customer endpoints
    getCustomerBookings: builder.query({
      query: () => 'bookings/my',
      providesTags: ['Bookings']
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: 'bookings',
        method: 'POST',
        body: bookingData
      }),
      invalidatesTags: ['Bookings', 'Workshops']
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `bookings/${bookingId}/cancel`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Bookings', 'Workshops']
    }),

    // Admin endpoints
  
  })
});

export const {
  useGetCustomerBookingsQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,

} = bookingApiSlice;