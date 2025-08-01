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

export const unitApi = createApi({
  reducerPath: "unitApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/unit/v1/get-unit?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['Unit'],
    }),
    addUnit: builder.mutation({
      query: (unitData) => ({
        url: "/unit/v1/add-unit",
        method: "POST",
        body: unitData,
      }),
      invalidatesTags: ["Unit"],
    }),
    editUnit: builder.mutation({
      query: ({ id, ...unitData }) => ({
        url: `/unit/v1/update-unit/${id}`,
        method: "PUT",
        body: unitData,
      }),
      invalidatesTags: ["Unit"],
    }),
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/unit/v1/delete-unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUnitsQuery,
  useAddUnitMutation,
  useEditUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
