import img from "../../images/done.png";
import styles from "./order-details.module.css";

interface IOrderDetailsProps {
  orderNumber: string;
}

export const OrderDetails = ({ orderNumber }: IOrderDetailsProps) => {
  return (
    <>
      <main className="mb-15">
        <h2 className={`${styles.glow} text text_type_digits-large mb-8 mt-8`}>
          {orderNumber}
        </h2>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <figure>
          <img src={img} alt="Заказ принят" />
        </figure>
      </main>
      <footer className="mb-30">
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </footer>
    </>
  );
};
