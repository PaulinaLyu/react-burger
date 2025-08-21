import { IOrdersFeed } from "../../models";
import styles from "./orders-status.module.css";

interface IOrdersStatusProps {
  data: IOrdersFeed;
}

export const OrdersStatus = ({ data }: IOrdersStatusProps) => {
  return (
    <>
      <section>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.text_sh} text text_type_digits-large pb-8`}>
          {data.total}
        </p>
      </section>
      <section>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.text_sh} text text_type_digits-large pb-8`}>
          {data.totalToday}
        </p>
      </section>
    </>
  );
};
