import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from "../utils/queryParams";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/master/other`
    : "/api/other",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: ({ page = 1, limit = 10, search = "", filters = {} } = {}) => ({
        url: `/doctor/v1/get-doctor?${buildQueryParams({
          page,
          limit,
          search,
          filters,
        })}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    getDoctorById: builder.query({
      query: (id) => ({
        url: `/doctor/v1/get-doctor/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Doctor", id }],
    }),
    createDoctor: builder.mutation({
      query: (data) => ({
        url: "/doctor/v1/add-doctor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/doctor/v1/update-doctor/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctor/v1/delete-doctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
