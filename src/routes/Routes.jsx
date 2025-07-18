import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import routeConfig from "./routeConfig";

const AppRoutes = () => {
  return (
    <Routes>
      {routeConfig.map(({ path, module, action, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute module={module} action={action}>
              {element}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
