import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hasPermission } from "../data/permissions";

const ProtectedRoute = ({ module, action = "V", children }) => {
  const userRole = useSelector((state) => state.user.user?.role);
  if (!hasPermission(userRole, module, action)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
