import { useAuth } from "../services/auth";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ route }) => {
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return auth.user ? route : <Navigate to="/login" replace />;
};
