import { Navigate } from "react-router";
import { userStorageService } from "../../services/userStorageService";

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const user = userStorageService.getUser();
  if (!user) return <Navigate to="/login" replace />;

  return <>{children ?? null}</>;
};
