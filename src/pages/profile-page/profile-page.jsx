import { Outlet, NavLink, useNavigate } from "react-router";
import { RouterPaths } from "../../utils";
import { useAppDispatch } from "../../hooks";
import { logoutUserThunk } from "../../services/actions/auth-actions";
import styles from "./profile-page.module.css";

const navItems = [
  {
    label: "Профиль",
    to: RouterPaths.PROFILE,
  },
  {
    label: "История заказов",
    to: RouterPaths.PROFILE_ORDERS,
  },
];

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      navigate(RouterPaths.LOGIN, { replace: true });
    } catch (err) {
      console.error("Ошибка выхода", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <nav className={`${styles.sidebar} ml-5 mr-15`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} end={item.to === RouterPaths.PROFILE}>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button className={styles.logout} onClick={handleLogout}>
              {" "}
              <span
                className={"text text_type_main-medium text_color_inactive"}
              >
                Выход
              </span>
            </button>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <Outlet />
    </div>
  );
};
