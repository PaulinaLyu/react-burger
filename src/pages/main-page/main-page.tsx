import { useEffect } from "react";
import { BurgerIngredients, BurgerConstructor } from "../../components";
import styles from "./main-page.module.css";
import { useAppDispatch } from "../../hooks";
import { fetchBurgerIngredients } from "../../services/actions";

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
};
