import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Checking authentication...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectRoute;
