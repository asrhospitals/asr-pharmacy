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

export const saltApi = createApi({
  reducerPath: 'saltApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getSalts: builder.query({
      query: () => ({
        url: '/salt/v1/get-salt',
        method: 'GET',
      }),
      providesTags: ['Salt'],
    }),
    addSalt: builder.mutation({
      query: (saltData) => ({
        url: '/salt/v1/add-salt',
        method: 'POST',
        body: saltData,
      }),
      invalidatesTags: ['Salt'],
    }),
    editSalt: builder.mutation({
      query: ({ id, ...saltData }) => ({
        url: `/salt/v1/update-salt/${id}`,
        method: 'PUT',
        body: saltData,
      }),
      invalidatesTags: ['Salt'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSaltsQuery, useAddSaltMutation, useEditSaltMutation } = saltApi; 