import { inventoryBaseApi } from './inventoryBaseApi';

export const hsnApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHSNs: builder.query({
      query: () => ({
        url: '/hsn/v1/get-hsn',
        method: 'GET',
      }),
      providesTags: ['HSN'],
    }),
    addHSN: builder.mutation({
      query: (hsnData) => ({
        url: '/hsn/v1/add-hsn',
        method: 'POST',
        body: hsnData,
      }),
      invalidatesTags: ['HSN'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHSNsQuery, useAddHSNMutation } = hsnApi; 