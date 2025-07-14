import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => ({
        url: "/company/v1/get-companies",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),
    addCompany: builder.mutation({
      query: (companyData) => ({
        url: "/company/v1/add-company",
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/v1/delete-company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
    editCompany: builder.mutation({
      query: ({ id, ...companyData }) => ({
        url: `/company/v1/update-company/${id}`,
        method: "PUT",
        body: companyData,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useDeleteCompanyMutation,
  useEditCompanyMutation,
} = companyApi;
