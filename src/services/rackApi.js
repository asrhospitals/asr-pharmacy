import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/master/inventory`
    : "/api/inventory",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const rackApi = createApi({
  reducerPath: "rackApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getRacks: builder.query({
      query: () => ({
        url: "/rack/v1/get-rack",
        method: "GET",
      }),
      providesTags: ["Rack"],
    }),
    addRack: builder.mutation({
      query: (rackData) => ({
        url: "/rack/v1/add-rack",
        method: "POST",
        body: rackData,
      }),
      invalidatesTags: ["Rack"],
    }),
    editRack: builder.mutation({
      query: ({ id, ...rackData }) => ({
        url: `/rack/v1/update-rack/${id}`,
        method: "PUT",
        body: rackData,
      }),
      invalidatesTags: ["Rack"],
    }),
    deleteRack: builder.mutation({
      query: (id) => ({
        url: `/rack/v1/delete-rack/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rack"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRacksQuery,
  useAddRackMutation,
  useEditRackMutation,
  useDeleteRackMutation,
} = rackApi;
