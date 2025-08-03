import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { createBaseQueryWithAuth } from './apiBase';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master`
  : '/api/admin/master';

export const billApi = createApi({
  reducerPath: 'billApi',
  baseQuery: createBaseQueryWithAuth(baseUrl),
  endpoints: (builder) => ({
    getBills: builder.query({
      query: () => ({
        url: '/get-hsn',
        method: 'GET',
      }),
    }),
    addBill: builder.mutation({
      query: (billData) => ({
        url: '/add-hsn',
        method: 'POST',
        body: billData,
      }),
    }),
  }),
});

export const { useGetBillsQuery, useAddBillMutation } = billApi; 