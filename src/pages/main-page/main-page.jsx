import { useEffect } from "react";
import {
  AppHeader,
  BurgerIngredients,
  BurgerConstructor,
} from "../../components";
import styles from "./main-page.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBurgerIngredients } from "../../services/actions";

export const MainPage = () => {
  const { data, isLoading } = useAppSelector(
    (state) => state.burgerIngredients
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, [dispatch]);
  return (
    <>
      {" "}
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} isLoadingData={isLoading} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
};
