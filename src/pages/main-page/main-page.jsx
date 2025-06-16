import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
} from "../../components";
import styles from "./main-page.module.css";

export const MainPage = ({ data }) => {
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
