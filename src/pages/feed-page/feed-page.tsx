import styles from "./feed-page.module.css";
import { Loader, OrdersFeed, OrdersStatus } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ERROR_WS } from "../../contants";

import { useEffect } from "react";
import { fetchBurgerIngredients } from "../../services/actions";
import { feedWsActions } from "../../services/wsSlices";

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { connected, error, messages } = useAppSelector(
    (state) => state.wsFeed
  );

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
    dispatch(feedWsActions.wsInit({}));
    return () => {
      dispatch(feedWsActions.wsEnd());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {!connected && <Loader />}
      {!!error && (
        <p className={`mb-2 text text_type_main-default`}>{ERROR_WS}</p>
      )}
      {connected && !!messages && (
        <main className={styles.main}>
          <section className={styles.col}>
            <h5 className="mt-6 mb-6 text text_type_main-large">
              Лента заказов
            </h5>
            <OrdersFeed data={messages} />
          </section>
          <section className={`${styles.col} mt-6`}>
            <OrdersStatus data={messages} />
          </section>
        </main>
      )}
    </div>
  );
};
