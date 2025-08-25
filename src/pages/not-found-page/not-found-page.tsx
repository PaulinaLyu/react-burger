import { Link } from "react-router";
import styles from "./not-found-page.module.css";
import { RouterPaths } from "../../utils";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const NotFoundPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.notfound}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>страница не найдена</h2>
        <Button htmlType="button" type="primary">
          <Link className={styles.link} to={RouterPaths.MAIN}>
            Главная
          </Link>
        </Button>
        <p></p>
      </div>
    </div>
  );
};
