import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./userSlice";
import { showToast } from "../componets/common/Toast";

// Create a base query with auth and token expiration handling
const createBaseQueryWithAuth = (baseUrl) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const errorData = result.error.data;
      console.log('Token expiration detected:', errorData);
      
      if (
        errorData?.code === "TOKEN_EXPIRED" ||
        errorData?.message?.includes("expired") ||
        errorData?.message?.includes("Token has expired") ||
        errorData?.message?.includes("Token has been revoked") ||
        errorData?.message?.includes("Invalid token") ||
        result.error.statusText === "Unauthorized"
      ) {
        console.log('Logging out due to token expiration');
        showToast("Session expired. Please login again.", { type: "warning" });
        api.dispatch(logout());
        // Small delay to ensure toast is shown before redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        return result;
      }
    }

    return result;
  };
};
export { createBaseQueryWithAuth };
