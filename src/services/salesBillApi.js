import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueryParams } from '../utils/queryParams';

import { createBaseQueryWithAuth } from './apiBase';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/sales/bills/v1`
  : "/api/sales/bills";

export const salesBillApi = createApi({
  reducerPath: 'salesBillApi',
  baseQuery: createBaseQueryWithAuth(baseUrl),
  tagTypes: ['SalesBill'],
  endpoints: (builder) => ({
    getBills: builder.query({
      query: ({ page = 1, limit, search = '', filters = {} } = {}) => ({
        url: `/get-bills?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['SalesBill'],
    }),
    getBill: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'SalesBill', id }],
    }),
    createBill: builder.mutation({
      query: (bill) => ({
        url: '/',
        method: 'POST',
        body: bill,
      }),
      invalidatesTags: ['SalesBill'],
    }),
    updateBill: builder.mutation({
      query: ({ id, ...bill }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: bill,
      }),
      invalidatesTags: ['SalesBill'],
    }),
    deleteBill: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SalesBill'],
    }),
  }),
});

export const {
  useGetBillsQuery,
  useGetBillQuery,
  useCreateBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,
} = salesBillApi; 