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

export const saltApi = createApi({
  reducerPath: "saltApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getSalts: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/salt/v1/get-salt?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['Salt'],
    }),
    addSalt: builder.mutation({
      query: (saltData) => ({
        url: "/salt/v1/add-salt",
        method: "POST",
        body: saltData,
      }),
      invalidatesTags: ["Salt"],
    }),
    editSalt: builder.mutation({
      query: ({ id, ...saltData }) => ({
        url: `/salt/v1/update-salt/${id}`,
        method: "PUT",
        body: saltData,
      }),
      invalidatesTags: ["Salt"],
    }),
    deleteSalt: builder.mutation({
      query: (id) => ({
        url: `/salt/v1/delete-salt/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Salt"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSaltsQuery,
  useAddSaltMutation,
  useEditSaltMutation,
  useDeleteSaltMutation,
} = saltApi;
