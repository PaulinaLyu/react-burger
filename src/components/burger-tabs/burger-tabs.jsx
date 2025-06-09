import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { categories, BUN } from "../../data/categories";
import styles from "./burger-tabs.module.css";

export const BurgerTabs = ({ changeTab }) => {
  const [activeTab, setActiveTab] = React.useState(BUN);

  const handleChangeTab = (type) => {
    setActiveTab(type);
    changeTab(type);
  };

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
