import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueryParams } from '../utils/queryParams';

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
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/store/v1/get-store?${buildQueryParams({ page, limit, search, filters })}`,
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
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/store/v1/delete-store/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Store'],
    }),
    editStore: builder.mutation({
      query: ({ id, ...storeData }) => ({
        url: `/store/v1/update-store/${id}`,
        method: 'PUT',
        body: storeData,
      }),
      invalidatesTags: ['Store'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStoresQuery,
  useAddStoreMutation,
  useDeleteStoreMutation,
  useEditStoreMutation
} = storeApi; 