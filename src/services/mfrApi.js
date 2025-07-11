import { inventoryBaseApi } from './inventoryBaseApi';

export const mfrApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManufacturers: builder.query({
      query: () => ({
        url: '/manu/v1/get-manufacturer',
        method: 'GET',
      }),
      providesTags: ['Manufacturer'],
    }),
    addManufacturer: builder.mutation({
      query: (mfrData) => ({
        url: '/manu/v1/add-manufacturer',
        method: 'POST',
        body: mfrData,
      }),
      invalidatesTags: ['Manufacturer'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetManufacturersQuery, useAddManufacturerMutation } = mfrApi; 