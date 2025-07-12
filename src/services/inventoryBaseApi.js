import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inventoryBaseApi = createApi({
  reducerPath: 'inventoryBaseApi',
  baseQuery: fetchBaseQuery({
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
  }),
  endpoints: () => ({}),
}); 