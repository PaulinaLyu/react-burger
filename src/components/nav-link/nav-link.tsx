import { ElementType } from "react";
import { NavLink as RouterNavLink } from "react-router";
import styles from "./nav-link.module.css";

interface INavLinkProps {
  href: string;
  icon: ElementType;
}

export const NavLink: React.FC<React.PropsWithChildren<INavLinkProps>> = ({
  icon: Icon,
  children,
  href,
}) => {
  return (
    <RouterNavLink to={href} className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}>
      {({ isActive }) => (
        <>
          {Icon && <Icon type={isActive ? "primary" : "secondary"} />}
          <span
            className={`text text_type_main-default ml-2 ${
              isActive ? "text_color_primary" : "text_color_inactive"
            }`}
          >
            {children}
          </span>
        </>
      )}
    </RouterNavLink>
  );
};
