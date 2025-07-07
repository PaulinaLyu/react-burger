import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { categories } from "../../data/categories";
import styles from "./burger-tabs.module.css";

export const BurgerTabs = ({ activeTab, changeTab }) => {
  const handleChangeTab = (type) => changeTab(type);

  return (
    <div className={`${styles.tabs} mb-8`}>
      {categories.map(({ key, label }) => (
        <Tab
          key={key}
          value={key}
          active={activeTab === key}
          onClick={handleChangeTab}
        >
          {label}
        </Tab>
      ))}
    </div>
  );
};

BurgerTabs.propTypes = {
  сhangeTab: PropTypes.func.isRequired,
};
