import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { categories, IngredientType } from "../../data/categories";
import styles from "./burger-tabs.module.css";

interface IBurgerTabs {
  activeTab: IngredientType;
  changeTab: (tab: IngredientType) => void;
}

export const BurgerTabs = ({ activeTab, changeTab }: IBurgerTabs) => {
  const handleChangeTab = (value: string) => {
    if (Object.values(IngredientType).includes(value as IngredientType)) {
      changeTab(value as IngredientType);
    } else {
      console.warn(`Неизвестный тип таб-элемента: ${value}`);
    }
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
