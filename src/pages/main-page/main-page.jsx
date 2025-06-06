import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
} from "../../components";
import styles from "./main-page.module.css";
import { data } from "../../data/data";

export const MainPage = () => {
  return (
    <>
      {" "}
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
};
