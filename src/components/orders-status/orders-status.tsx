import { useMemo } from "react";
import { FeedItem, IOrdersFeed } from "../../models";
import styles from "./orders-status.module.css";

interface IOrdersStatusProps {
  data: IOrdersFeed;
}

export const OrdersStatus = ({ data }: IOrdersStatusProps) => {
  const doneOrders = useMemo(
    () =>
      data.orders
        .filter((item: FeedItem) => item.status === "done")
        .map((item: FeedItem) => item.number),
    [data.orders]
  );

  const pendingOrders = useMemo(
    () =>
      data.orders
        .filter((item: FeedItem) => item.status === "pending")
        .map((item: FeedItem) => item.number),
    [data.orders]
  );

  return (
    <>
      <div className={`${styles.orders} mb-5`}>
        <section className={styles.col}>
          <p className="text text_type_main-medium">Готовы:</p>
          <div className={`${styles.ready_orders}`}>
            <div>
              <ul className={styles.ul}>
                {doneOrders.map((item) => (
                  <li key={item} className="mt-2 mr-8">
                    <span
                      className={`text text_type_digits-default ${styles.ready}`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.col}>
          <p className="text text_type_main-medium">В работе:</p>
          <div className={styles.list_number_orders}>
            <ul className={styles.ul}>
              {pendingOrders.map((item) => (
                <li key={item} className="mt-2 mr-8">
                  <span
                    className={`text text_type_digits-default ${styles.work}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <section>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.glow} text text_type_digits-large pb-8`}>
          {data.total}
        </p>
      </section>
      <section>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.glow} text text_type_digits-large pb-8`}>
          {data.totalToday}
        </p>
      </section>
    </>
  );
};
