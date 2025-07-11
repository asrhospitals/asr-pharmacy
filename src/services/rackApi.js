import { inventoryBaseApi } from './inventoryBaseApi';

export const rackApi = inventoryBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRacks: builder.query({
      query: () => ({
        url: '/rack/v1/get-rack',
        method: 'GET',
      }),
      providesTags: ['Rack'],
    }),
    addRack: builder.mutation({
      query: (rackData) => ({
        url: '/rack/v1/add-rack',
        method: 'POST',
        body: rackData,
      }),
      invalidatesTags: ['Rack'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRacksQuery, useAddRackMutation } = rackApi; 