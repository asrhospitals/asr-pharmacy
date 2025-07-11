import { inventoryBaseApi } from './inventoryBaseApi';

export const unitApi = inventoryBaseApi.injectEndpoints({
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
  }),
  overrideExisting: false,
});

export const { useGetUnitsQuery, useAddUnitMutation } = unitApi; 