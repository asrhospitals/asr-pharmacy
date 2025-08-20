import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../services/authApi";

const VerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get("code");

  const [verifyEmail, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  useEffect(() => {
    if (verificationCode && !isError) {
      verifyEmail({ code: verificationCode });
    }
  }, [verificationCode, verifyEmail]);

  useEffect(() => {
    if (isError) {
      navigate("/login", { replace: true });
      console.error("Email verification failed:", error);
    }
  }, [isError, navigate, error]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white px-6 py-10 rounded-xl shadow text-center">
        {isLoading && (
          <p className="text-lg font-medium">Verifying your email...</p>
        )}

        {isSuccess && (
          <>
            <h1 className="text-2xl font-bold mb-2">✅ Email Verified</h1>
            <p className="text-gray-600 mb-6">
              Your email has been verified. You can now log in to your account.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Go to Login
            </button>
          </>
        )}

        {isError && (
          <p className="text-red-600 font-medium">
            ❌ {error?.data?.message || "Verification failed"}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
