import { useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { Routes, Route, useLocation, useNavigate } from "react-router";
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
import { ProtectedRoute } from "../protected-route/protected-route";
import { FeedPage } from "../../pages/feed-page";
import { FeedOrderPage } from "../../pages/feed-order-page";
import { fetchBurgerIngredients } from "../../services/actions";
import { Modal } from "../modal";
import { IngredientDetails } from "../ingredient-details";
import { OrderInfo } from "../order-info/order-info";
import { FeedItem, Ingredient } from "../../models";

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.backgroundLocation;
  const ingredient: Ingredient = location.state?.ingredient;
  const order: FeedItem = location.state?.order;

  const hideIngredientDetailsModal = () => {
    navigate(RouterPaths.MAIN, {
      state: {
        backgroundLocation: null,
      },
    });
  };

  const hideCurrentOrderFromFeed = () => {
    navigate(RouterPaths.FEED, {
      state: {
        backgroundLocation: null,
      },
    });
  };

  const hideCurrentOrderFromProfile = () => {
    navigate(RouterPaths.PROFILE + "/" + RouterPaths.PROFILE_ORDERS, {
      state: {
        backgroundLocation: null,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, [dispatch]);

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
              path={RouterPaths.PROFILE_ORDER}
              element={<FeedOrderPage />}
            />
            <Route
              path={RouterPaths.PROFILE_ORDERS}
              element={<ProfileOrders />}
            />
          </Route>
          <Route path={RouterPaths.INGREDIENTS} element={<IngredientsPage />} />

          <Route path={RouterPaths.FEED}>
            <Route index element={<FeedPage />} />
            <Route path={RouterPaths.FEED_ORDER} element={<FeedOrderPage />} />
          </Route>
        </Route>
        <Route path={RouterPaths.NOTFOUND} element={<NotFoundPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={RouterPaths.INGREDIENTS}
            element={
              <Modal
                title="Детали ингредиента"
                onClose={hideIngredientDetailsModal}
              >
                <IngredientDetails item={ingredient} />
              </Modal>
            }
          />
          <Route
            path={RouterPaths.FEED + "/" + RouterPaths.FEED_ORDER}
            element={
              <Modal onClose={hideCurrentOrderFromFeed}>
                <OrderInfo item={order} />
              </Modal>
            }
          />
          <Route
            path={RouterPaths.PROFILE + "/" + RouterPaths.PROFILE_ORDER}
            element={
              <Modal onClose={hideCurrentOrderFromProfile}>
                <OrderInfo item={order} />
              </Modal>
            }
          />
        </Routes>
      )}
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
