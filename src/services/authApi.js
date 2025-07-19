import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  ? `${import.meta.env.VITE_BACKEND_BASE_URL}/auth`
  : "/auth";

console.log("baseUrl", baseUrl);
console.log("env url", import.meta.env.VITE_BACKEND_BASE_URL);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
