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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/change-password",
        method: "POST",
        body: passwordData,
      }),
    }),
    switchCompany: builder.mutation({
      query: (companyData) => ({
        url: "/switch-company",
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSwitchCompanyMutation,
} = userApi; 