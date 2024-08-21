import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  isAuthRoute = false,
}: {
  children: React.ReactNode;
  isAuthRoute?: boolean;
}) => {
  const { authUser } = useAuth();

  if (authUser && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  if (!authUser && !isAuthRoute) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
