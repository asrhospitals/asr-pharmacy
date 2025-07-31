import { createApi } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from "../utils/queryParams";
import { createBaseQueryWithAuth } from "./apiBase";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master/other`
  : "/api/other";

// const baseQueryWithAuth = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
//     ? `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/master/other`
//     : "/api/other",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState()?.user?.token || localStorage.getItem("token");
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

export const prescriptionApi = createApi({
  reducerPath: "prescriptionApi",
  baseQuery: createBaseQueryWithAuth(baseUrl),
  tagTypes: ["Prescription"],
  endpoints: (builder) => ({
    getPrescriptions: builder.query({
      query: ({ page = 1, limit = 10, search = "", filters = {} } = {}) => ({
        url: `/prescription/v1/get-prescription?${buildQueryParams({
          page,
          limit,
          search,
          filters,
        })}`,
        method: "GET",
      }),
      providesTags: ["Prescription"],
    }),
    getPrescriptionById: builder.query({
      query: (id) => ({
        url: `/prescription/v1/get-prescriptions/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Prescription", id }],
    }),
    createPrescription: builder.mutation({
      query: (data) => ({
        url: "/prescription/v1/add-prescription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prescription"],
    }),
    updatePrescription: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/prescription/v1/update-prescription/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Prescription"],
    }),
    deletePrescription: builder.mutation({
      query: (id) => ({
        url: `/prescription/v1/delete-prescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescription"],
    }),
  }),
});

export const {
  useGetPrescriptionsQuery,
  useGetPrescriptionByIdQuery,
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionApi;
