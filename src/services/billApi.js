import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/master/inventory/hsn/v1`
  : '/api/bill';

export const billApi = createApi({
  reducerPath: 'billApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
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