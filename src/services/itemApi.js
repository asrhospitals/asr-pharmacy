import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/master/inventory`
    : '/api/inventory',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: baseQueryWithAuth,
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
    editItem: builder.mutation({
      query: ({ id, ...itemData }) => ({
        url: `/item/v1/update-item/${id}`,
        method: 'PUT',
        body: itemData,
      }),
      invalidatesTags: ['Item'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetItemsQuery, useAddItemMutation, useEditItemMutation } = itemApi; 