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

export const unitApi = createApi({
  reducerPath: 'unitApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: () => ({
        url: '/unit/v1/get-unit',
        method: 'GET',
      }),
      providesTags: ['Unit'],
    }),
    addUnit: builder.mutation({
      query: (unitData) => ({
        url: '/unit/v1/add-unit',
        method: 'POST',
        body: unitData,
      }),
      invalidatesTags: ['Unit'],
    }),
    editUnit: builder.mutation({
      query: ({ id, ...unitData }) => ({
        url: `/unit/v1/update-unit/${id}`,
        method: 'PUT',
        body: unitData,
      }),
      invalidatesTags: ['Unit'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUnitsQuery, useAddUnitMutation, useEditUnitMutation } = unitApi; 