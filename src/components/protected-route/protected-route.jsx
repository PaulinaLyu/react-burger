import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getUserThunk } from "../../services/actions/auth-actions";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  debugger;
  useEffect(() => {
    async function init() {
      await dispatch(getUserThunk());
      setUserLoaded(true);
    }
    init();
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }
  debugger;
  return user ? children : <Navigate to="/login" replace />;
};
