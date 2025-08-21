import styles from "./feed-page.module.css";
import { Loader, OrdersFeed, OrdersStatus } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ERROR_WS } from "../../contants";
import { wsEnd, wsInit } from "../../services/reducers/ws.reducer";
import { useEffect } from "react";
import { fetchBurgerIngredients } from "../../services/actions";

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { connected, error, messages } = useAppSelector((state) => state.ws);

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
    dispatch(wsInit());
    return () => {
      dispatch(wsEnd());
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
          <section className="mt-6">
            <OrdersStatus data={messages} />
          </section>
        </main>
      )}
    </div>
  );
};
