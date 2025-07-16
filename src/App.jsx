import AppLayout from "./componets/layout/AppLayout";
import LoginPage from "./componets/auth/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./services/userSlice";
import { useEffect, useState } from "react";
import Loader from './componets/common/Loader';
import Toast from "./componets/common/Toast";

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

  if (restoring) {
    return <Loader />;
  }

  return (
    <>
      {!isAuthenticated ? <LoginPage /> : <AppLayout />}
      <Toast />
    </>
  );
}

export default App;
