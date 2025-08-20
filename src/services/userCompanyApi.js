import { createApi } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from "../utils/queryParams";
import { createBaseQueryWithAuth } from "./apiBase";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/admin/master`
  : "/api/inventory";

export const userCompanyApi = createApi({
  reducerPath: "userCompanyApi",
  baseQuery: createBaseQueryWithAuth(baseUrl),
  endpoints: (builder) => ({
    getUserCompanies: builder.query({
      query: (userId) =>
        `/inventory/userCompany/v1/get-UserCompanies/${userId}`,
    }),
    createUserCompany: builder.mutation({
      query: ({ userId, companyData }) => ({
        url: `/inventory/userCompany/v1/add-UserCompanies/${userId}`,
        method: "POST",
        body: companyData,
      }),
    }),
    deleteCompany: builder.mutation({
      query: ({ companyId, userId }) => ({
        url: `/inventory/userCompany/v1/${companyId}/delete-UserCompany/${userId}`,
        method: "DELETE",
      }),
    }),
    getAllCompanies: builder.query({
      query: () => `/inventory/userCompany/v1/get-all-user-companies`,
    }),
  }),
});

export const {
  useGetUserCompaniesQuery,
  useCreateUserCompanyMutation,
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
} = userCompanyApi;
