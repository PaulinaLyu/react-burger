import PropTypes from "prop-types";
import { NavLink } from "../nav-link";
import styles from "./nav-group.module.css";

export const NavGroup = ({ position = "left", navLinks }) => (
  <nav className={styles[position]}>
    {navLinks.map(({ href, icon, label }) => (
      <NavLink key={label} href={href} icon={icon}>
        {label}
      </NavLink>
    ))}
  </nav>
);

export const navTypes = PropTypes.shape({
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["left", "right"]),
});

NavGroup.propTypes = {
  position: PropTypes.oneOf(["left", "right"]),
  navLinks: PropTypes.arrayOf(navTypes.isRequired).isRequired,
};
