import { NavLink as RouterNavLink } from "react-router";
import PropTypes from "prop-types";
import styles from "./nav-link.module.css";

export const NavLink = ({ icon: Icon, children, href }) => {
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

NavLink.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
