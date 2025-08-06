import { createApi } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from '../utils/queryParams';
import { createBaseQueryWithAuth } from './apiBase';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master`
  : "/pharmacy/admin/master";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: createBaseQueryWithAuth(baseUrl),
  tagTypes: ['Transaction', 'TransactionStats'],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ page = 1, limit, search = '', voucherType, status, isPosted, startDate, endDate } = {}) => ({
        url: `/transaction/v1/get-transactions?${buildQueryParams({ page, limit, search, voucherType, status, isPosted, startDate, endDate })}`,
        method: 'GET',
      }),
      providesTags: ['Transaction'],
      transformResponse: (response) => response.data || [],
    }),

    getTransactionById: builder.query({
      query: (id) => ({
        url: `/transaction/v1/get-transaction/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Transaction', id }],
      transformResponse: (response) => response.data || {},
    }),

    createTransaction: builder.mutation({
      query: (transactionData) => ({
        url: '/transaction/v1/add-transaction',
        method: 'POST',
        body: transactionData,
      }),
      invalidatesTags: ['Transaction'],
    }),

    updateTransaction: builder.mutation({
      query: ({ id, ...transactionData }) => ({
        url: `/transaction/v1/update-transaction/${id}`,
        method: 'PUT',
        body: transactionData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Transaction', id }, 'Transaction'],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/v1/delete-transaction/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),

    postTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/v1/post-transaction/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Transaction', id }, 'Transaction'],
    }),

    cancelTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/v1/cancel-transaction/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Transaction', id }, 'Transaction'],
    }),

    getTransactionStats: builder.query({
      query: ({ startDate, endDate, voucherType } = {}) => ({
        url: `/transaction/v1/stats?${buildQueryParams({ startDate, endDate, voucherType })}`,
        method: 'GET',
      }),
      providesTags: ['TransactionStats'],
      transformResponse: (response) => response.data || {},
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  usePostTransactionMutation,
  useCancelTransactionMutation,
  useGetTransactionStatsQuery,
} = transactionApi; 