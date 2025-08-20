import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "./services/userSlice";
import Loader from "./componets/common/Loader";
import { Toast } from "./componets/common/Toast";

import AppLayout from "./componets/layout/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import VerificationPage from "./pages/verification/VerificationPage";
import RegistrationSuccessPage from "./pages/other/RegistrationSucessPage";
import CompanyList from "./pages/other/CompanyList";
import CreateCompanyPage from "./pages/other/CreateCompanyPage";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restoring, setRestoring] = useState(true);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setUser({ user: JSON.parse(user), token }));
    }
    setRestoring(false);
  }, [dispatch]);

  useEffect(() => {
    if (
      user?.userCompanies &&
      user?.userCompanies?.length == 0 &&
      localStorage.getItem("token")
    ) {
      if (location.pathname !== "/create-company") {
        return navigate("/create-company", { replace: true });
      }
    }
    // if (!user?.id) {
    //   return navigate("/login", { replace: true });
    // }
  }, [user, navigate]);

  if (restoring) return <Loader />;

  return (
    <div className="h-screen">
      <Toast />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerificationPage />} />
        <Route path="/signup-success" element={<RegistrationSuccessPage />} />
        <Route path="/company-list" element={<CompanyList />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />

        {/* Protected routes (everything else) */}
        <Route
          path="/*"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
