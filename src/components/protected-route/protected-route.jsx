import { Navigate } from "react-router";
import { userStorageService } from "../../services/userStorageService";

export const ProtectedRoute = ({ children }) => {
  const user = userStorageService.getUser();
  return user ? children : <Navigate to="/login" replace />;
};
