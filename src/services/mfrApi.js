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

export const mfrApi = createApi({
  reducerPath: "mfrApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getManufacturers: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/manu/v1/get-manufacturer?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['Manufacturer'],
    }),
    addManufacturer: builder.mutation({
      query: (mfrData) => ({
        url: "/manu/v1/add-manufacturer",
        method: "POST",
        body: mfrData,
      }),
      invalidatesTags: ["Manufacturer"],
    }),
    editManufacturer: builder.mutation({
      query: ({ id, ...mfrData }) => ({
        url: `/manu/v1/update-manufacturer/${id}`,
        method: "PUT",
        body: mfrData,
      }),
      invalidatesTags: ["Manufacturer"],
    }),
    deleteManufacturer: builder.mutation({
      query: (id) => ({
        url: `/manu/v1/delete-manufacturer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Manufacturer"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetManufacturersQuery,
  useAddManufacturerMutation,
  useEditManufacturerMutation,
  useDeleteManufacturerMutation,
} = mfrApi;
