import { useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientsPage,
  NotFoundPage,
} from "../../pages";
import { ProfileEdit } from "../profile-edit";
import { ProfileOrders } from "../profile-orders";
import { RouterPaths } from "../../utils";
import { MainLayout } from "../../layouts/main-layout";
import { useAppDispatch } from "../../hooks";
import styles from "./app.module.css";
import { setCurrentIngredient } from "../../services/reducers/ingredient-details.reducer";
import { ProtectedRoute } from "../protected-route/protected-route";

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const ingredient = location.state?.ingredient;

  useEffect(() => {
    dispatch(setCurrentIngredient(ingredient));
  }, [dispatch, ingredient]);

  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route element={<MainLayout />}>
          <Route path={RouterPaths.MAIN} element={<MainPage />} />
          <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
          <Route path={RouterPaths.REGISTRATION} element={<RegisterPage />} />
          <Route
            path={RouterPaths.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={RouterPaths.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />

          <Route
            path={RouterPaths.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileEdit />} />
            <Route
              path={RouterPaths.PROFILE_ORDERS}
              element={<ProfileOrders />}
            />
          </Route>
          <Route path={RouterPaths.INGREDIENTS} element={<IngredientsPage />} />
        </Route>
        <Route path={RouterPaths.NOTFOUND} element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};
