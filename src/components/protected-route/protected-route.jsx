import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};
