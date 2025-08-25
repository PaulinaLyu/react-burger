import { BurgerIngredients, BurgerConstructor } from "../../components";
import styles from "./main-page.module.css";

export const MainPage = () => {
  return (
    <>
      <div className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
};
