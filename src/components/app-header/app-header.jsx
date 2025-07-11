import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavGroup } from "../nav-group";
import styles from "./app-header.module.css";

const navLinks = [
  {
    href: "/",
    icon: BurgerIcon,
    label: "Конструктор",
    position: "left",
  },
  {
    href: "/",
    icon: ListIcon,
    label: "Лента заказов",
    position: "left",
  },
  {
    href: "/",
    icon: ProfileIcon,
    label: "Личный кабинет",
    position: "right",
  },
];

export const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <NavGroup
        position="left"
        navLinks={navLinks.filter((link) => link.position === "left")}
      />
      <Logo />
      <NavGroup
        position="right"
        navLinks={navLinks.filter((link) => link.position === "right")}
      />
    </header>
  );
};
