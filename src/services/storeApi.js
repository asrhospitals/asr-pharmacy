import { inventoryBaseApi } from './inventoryBaseApi';

export const storeApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => ({
        url: '/store/v1/get-store',
        method: 'GET',
      }),
      providesTags: ['Store'],
    }),
    addStore: builder.mutation({
      query: (storeData) => ({
        url: '/store/v1/add-store',
        method: 'POST',
        body: storeData,
      }),
      invalidatesTags: ['Store'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStoresQuery, useAddStoreMutation } = storeApi; 