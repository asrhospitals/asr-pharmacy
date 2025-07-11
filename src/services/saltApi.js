import { inventoryBaseApi } from './inventoryBaseApi';

export const saltApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalts: builder.query({
      query: () => ({
        url: '/salt/v1/get-salt',
        method: 'GET',
      }),
      providesTags: ['Salt'],
    }),
    addSalt: builder.mutation({
      query: (saltData) => ({
        url: '/salt/v1/add-salt',
        method: 'POST',
        body: saltData,
      }),
      invalidatesTags: ['Salt'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSaltsQuery, useAddSaltMutation } = saltApi; 