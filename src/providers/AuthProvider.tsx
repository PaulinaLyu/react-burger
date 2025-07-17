import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { getUserThunk } from "../services/actions/auth-actions";
import { toast } from "react-toastify";
import { Loader } from "../components";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(getUserThunk()).unwrap();
      } catch (err) {
        toast.error("Ошибка авторизации");
      } finally {
        setIsAuthChecked(true);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Loader />;
  }

  return <>{children}</>;
};
