import { inventoryBaseApi } from './inventoryBaseApi';

export const itemApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: '/item/v1/get-item',
        method: 'GET',
      }),
      providesTags: ['Item'],
    }),
    addItem: builder.mutation({
      query: (itemData) => ({
        url: '/item/v1/add-item',
        method: 'POST',
        body: itemData,
      }),
      invalidatesTags: ['Item'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetItemsQuery, useAddItemMutation } = itemApi; 