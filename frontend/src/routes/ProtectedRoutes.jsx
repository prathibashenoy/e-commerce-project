import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { token, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // 🔒 Not logged in → go to login & remember FULL location
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}   // ✅ FIXED
        replace
      />
    );
  }

  // 🚫 Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
