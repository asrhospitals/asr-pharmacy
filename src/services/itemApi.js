import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueryParams } from '../utils/queryParams';

import { createBaseQueryWithAuth } from './apiBase';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master/inventory`
  : '/api/admin/master/inventory';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: createBaseQueryWithAuth(baseUrl),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ page = 1, limit, search = '', filters = {} } = {}) => ({
        url: `/item/v1/get-item?${buildQueryParams({ page, limit, search, filters })}`,
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