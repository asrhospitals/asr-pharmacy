import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/master/inventory`
    : '/api/inventory',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => ({
        url: '/store/v1/get-store',
        method: 'GET',
      }),
      providesTags: ['Store'],
    }),
    addStore: builder.mutation({
      query: (storeData) => ({
        url: '/store/v1/add-store',
        method: 'POST',
        body: storeData,
      }),
      invalidatesTags: ['Store'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStoresQuery, useAddStoreMutation } = storeApi; 