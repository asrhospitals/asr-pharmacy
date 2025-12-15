import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithAuth } from "./apiBase";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/masters/batch`
  : "/pharmacy/admin/masters/batch";

export const batchApi = createApi({
  reducerPath: "batchApi",
  baseQuery: createBaseQueryWithAuth(baseUrl),
  tagTypes: ["Batch"],
  endpoints: (builder) => ({
    getBatchesByItem: builder.query({
      query: (itemId) => ({
        url: `/v1/get-by-item/${itemId}`,
        method: "GET",
      }),
      providesTags: ["Batch"],
    }),

    getAllBatches: builder.query({
      query: ({ itemId, status } = {}) => {
        const params = new URLSearchParams();
        if (itemId) params.append("itemId", itemId);
        if (status) params.append("status", status);
        return {
          url: `/v1/get-all?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Batch"],
    }),

    getBatchById: builder.query({
      query: (id) => ({
        url: `/v1/get/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Batch", id }],
    }),
  }),
});

export const {
  useGetBatchesByItemQuery,
  useGetAllBatchesQuery,
  useGetBatchByIdQuery,
} = batchApi;
