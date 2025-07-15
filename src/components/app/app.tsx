import { Bounce, ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";
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
import { RouterPaths } from "../../utils";
import { MainLayout } from "../../layouts/main-layout";
import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
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
          <Route path={RouterPaths.PROFILE} element={<ProfilePage />} />
          <Route path={RouterPaths.INGREDIENTS} element={<IngredientsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
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
