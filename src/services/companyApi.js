import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from '../utils/queryParams';
import { createBaseQueryWithAuth } from "./apiBase";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master/inventory`
  : "/api/inventory";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
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
  baseQuery: createBaseQueryWithAuth(baseUrl),
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/company/v1/get-companies?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['Company'],
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
