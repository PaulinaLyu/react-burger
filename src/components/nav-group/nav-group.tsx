import { ElementType } from "react";
import { NavLink } from "../nav-link";
import styles from "./nav-group.module.css";

type TNavPosition = "left" | "right";

interface INavItem {
  href: string;
  icon: ElementType;
  label: string;
  position?: TNavPosition;
}

interface INavGroupProps {
  position?: TNavPosition;
  navLinks: INavItem[];
}

export const NavGroup = ({ position = "left", navLinks }: INavGroupProps) => (
  <nav className={styles[position]}>
    {navLinks.map(({ href, icon, label }) => (
      <NavLink key={label} href={href} icon={icon}>
        {label}
      </NavLink>
    ))}
  </nav>
);
