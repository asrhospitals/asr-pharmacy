import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from '../utils/queryParams';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/master/inventory`
    : "/api/inventory",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const hsnApi = createApi({
  reducerPath: "hsnApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getHSNs: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/hsn/v1/get-hsn?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['HSN'],
    }),
    addHSN: builder.mutation({
      query: (hsnData) => ({
        url: "/hsn/v1/add-hsn",
        method: "POST",
        body: hsnData,
      }),
      invalidatesTags: ["HSN"],
    }),
    editHSN: builder.mutation({
      query: ({ id, ...hsnData }) => ({
        url: `/hsn/v1/update-hsn/${id}`,
        method: "PUT",
        body: hsnData,
      }),
      invalidatesTags: ["HSN"],
    }),
    deleteHSN: builder.mutation({
      query: (id) => ({
        url: `/hsn/v1/delete-hsn/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HSN"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHSNsQuery,
  useAddHSNMutation,
  useEditHSNMutation,
  useDeleteHSNMutation,
} = hsnApi;
