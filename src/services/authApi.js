import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./userSlice";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/pharmacy/auth`
    : "/api/auth",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const errorData = result.error.data;

    if (
      errorData?.code === "TOKEN_EXPIRED" ||
      errorData?.message?.includes("expired") ||
      result.error.statusText === "Unauthorized"
    ) {
      api.dispatch(logout());
      window.location.href = "/";

      return result;
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
