import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithAuth } from "./apiBase";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master`
  : "/api/account";
export const purchaseMasterApi = createApi({
  reducerPath: "purchaseMasterApi",
  baseQuery: createBaseQueryWithAuth(baseUrl),
  tagTypes: ["PurchaseMaster", "PurchaseMasterById"],
  endpoints: (builder) => ({
    getPurchaseMasters: builder.query({
      query: (params) => ({
        url: `/purchase-master/v1/get-purchase-master`,
        method: 'GET',
        params,
      }),
      providesTags: ['PurchaseMaster', 'PurchaseMasterById'],
    }),

    getPurchaseMasterById: builder.query({
      query: (id) => ({
        url: `/purchase-master/v1/get-purchase-master/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'PurchaseMasterById', id }],
    }),

    createPurchaseMaster: builder.mutation({
      query: (data) => ({
        url: `/purchase-master/v1/add-purchase-master`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PurchaseMaster', 'PurchaseMasterById'],
    }),

    updatePurchaseMaster: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/purchase-master/v1/update-purchase-master/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        'PurchaseMaster',
        { type: 'PurchaseMasterById', id },
      ],
    }),

    deletePurchaseMaster: builder.mutation({
      query: (id) => ({
        url: `/purchase-master/v1/delete-purchase-master/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PurchaseMaster', 'PurchaseMasterById'],
    }),
  }),
});

export const {
  useGetPurchaseMastersQuery,
  useGetPurchaseMasterByIdQuery,
  useCreatePurchaseMasterMutation,
  useUpdatePurchaseMasterMutation,
  useDeletePurchaseMasterMutation,
} = purchaseMasterApi; 