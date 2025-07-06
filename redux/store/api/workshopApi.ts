import { Workshop } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store'; // Adjust the import path as needed to point to your store definition


export const workshopApi = createApi({
  reducerPath: 'workshopApi',
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
  tagTypes: ['Workshop'],
  endpoints: (builder) => ({
    getWorkshops: builder.query<Workshop[], void>({
      query: () => 'workshops',
      providesTags: ['Workshop'],
    }),
    getWorkshopById: builder.query<Workshop, string>({
      query: (id) => `workshops/${id}`,
      providesTags: (result, error, id) => [{ type: 'Workshop', id }],
    }),



  }),
});

export const {
  useGetWorkshopsQuery,
  useGetWorkshopByIdQuery,
} = workshopApi;
