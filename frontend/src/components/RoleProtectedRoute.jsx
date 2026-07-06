import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // role check
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;