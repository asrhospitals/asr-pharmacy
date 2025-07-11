import { inventoryBaseApi } from './inventoryBaseApi';

export const companyApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => ({
        url: '/company/v1/get-companies',
        method: 'GET',
      }),
      providesTags: ['Company'],
    }),
    addCompany: builder.mutation({
      query: (companyData) => ({
        url: '/company/v1/add-company',
        method: 'POST',
        body: companyData,
      }),
      invalidatesTags: ['Company'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCompaniesQuery, useAddCompanyMutation } = companyApi; 