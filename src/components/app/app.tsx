import { ERROR_TEXT, LOADING_TEXT } from "../../contants";
import { MainPage } from "../../pages";
import { useIngredients } from "../../hooks";
import styles from "./app.module.css";

export const App = () => {
  const { data, isLoading, isError } = useIngredients();

  return (
    <div className={styles.app}>
      {isLoading || isError ? (
        <main className={styles.loading}>
          <p className="text text_type_main-medium">
            {isLoading ? LOADING_TEXT : ERROR_TEXT}
          </p>
        </main>
      ) : (
        <MainPage data={data} />
      )}
    </div>
  );
};
