import { Outlet, NavLink } from "react-router";
import { RouterPaths } from "../../utils";
import styles from "./profile-page.module.css";

const navItems = [
  {
    label: "Профиль",
    to: "",
  },
  {
    label: "История заказов",
    to: RouterPaths.PROFILE_ORDERS,
  },
  {
    label: "Выход",
    to: RouterPaths.PROFILE_LOGOUT,
  },
];

export const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={`${styles.sidebar} ml-5 mr-15`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} end={item.to === ""}>
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
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <Outlet />
    </div>
  );
};
