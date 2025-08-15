import AppLayout from "./componets/layout/AppLayout";
import LoginPage from "./componets/auth/LoginPage";
import SignUpPage from "./componets/auth/SignUpPage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./services/userSlice";
import { useEffect, useState } from "react";
import Loader from "./componets/common/Loader";
import Toast from "./componets/common/Toast";
import { Routes, Route } from "react-router-dom";
import VerificationPage from "./pages/verification/VerificationPage";

function App() {
  const dispatch = useDispatch();
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setUser({ user: JSON.parse(user), token }));
    }
    setRestoring(false);
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log("User authentication status:", isAuthenticated);
  

  if (restoring) {
    return <Loader />;
  }

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerificationPage />} />
        <Route path="*" element={
          !isAuthenticated ? <LoginPage /> : <AppLayout />
        } />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
