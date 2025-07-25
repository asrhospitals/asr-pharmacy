import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueryParams } from '../utils/queryParams';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/sales/bills/v1`
    : "/api/sales/bills",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const salesBillApi = createApi({
  reducerPath: 'salesBillApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['SalesBill'],
  endpoints: (builder) => ({
    getBills: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
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