import { apiSlice } from '../api/apiSlice';

export const workshopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkshops: builder.query({
      query: () => ({
        url: 'workshops',
        method: 'GET'
      }),
      providesTags: ['Workshops']
    }),
    createWorkshop: builder.mutation({
      query: (workshopData) => ({
        url: 'workshops',
        method: 'POST',
        body: workshopData
      }),
      invalidatesTags: ['Workshops']
    }),
    updateWorkshop: builder.mutation({
      query: ({ id, ...workshopData }) => ({
        url: `workshops/${id}`,
        method: 'PUT',
        body: workshopData
      }),
      invalidatesTags: ['Workshops']
    }),
    deleteWorkshop: builder.mutation({
      query: (id) => ({
        url: `workshops/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Workshops']
    })
  })
});

export const {
  useGetWorkshopsQuery,
  useCreateWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation
} = workshopApiSlice;
