import { useMemo } from "react";
import styles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedItem, IngredientWithCount } from "../../models";
import { useAppSelector } from "../../hooks";
import { calculateOrderTotal, getOrderStatus } from "../../utils";
import { Loader } from "../loader";

interface IOrderInfoProps {
  item: FeedItem | null;
}

const IngredientRow = ({ item }: { item: IngredientWithCount }) => (
  <li key={item._id} className="mt-4 mr-6">
    <div className={styles.row}>
      <div className={styles.image_name}>
        <div className={styles.image}>
          <img src={item.image_mobile} alt={item.name} loading="lazy" />
        </div>
        <p className={`text text_type_main-default ml-4 ${styles.pname}`}>
          {item.name}
        </p>
      </div>
      <div className={styles.count_price}>
        <span className="text text_type_digits-default mr-2">
          {`${item.count} x ${item.price}`}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </li>
);

const OrderHeader = ({ item, status }: { item: FeedItem; status: string }) => (
  <>
    <p className="text text_type_digits-default mb-10">#{item.number}</p>
    <p className="text text_type_main-medium mb-3">{item.name}</p>
    <p className={`text text_type_main-default mb-10 ${styles.status}`}>
      {status}
    </p>
  </>
);

export const OrderInfo = ({ item }: IOrderInfoProps) => {
  const { data: ingredients } = useAppSelector(
    (state) => state.burgerIngredients
  );

  const status = useMemo(() => (item ? getOrderStatus(item) : ""), [item]);

  const orderIngredients = useMemo(() => {
    if (!item?.ingredients || !ingredients?.length) return null;

    const ingredientMap = new Map<string, IngredientWithCount>();

    item.ingredients.forEach((ingredientId) => {
      const ingredient = ingredients.find((elem) => elem._id === ingredientId);
      if (ingredient) {
        const existing = ingredientMap.get(ingredientId);
        if (existing) {
          existing.count += 1;
        } else {
          ingredientMap.set(ingredientId, { ...ingredient, count: 1 });
        }
      }
    });

    return Array.from(ingredientMap.values());
  }, [ingredients, item]);

  const total = useMemo(
    () => (orderIngredients ? calculateOrderTotal(orderIngredients) : 0),
    [orderIngredients]
  );

  if (!item) {
    return (
      <main className={styles.container}>
        <p className="text text_type_main-default">Заказ не найден</p>
      </main>
    );
  }

  if (!orderIngredients) {
    return (
      <main className={styles.container}>
        <Loader />
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className="visually-hidden">Информация о заказе #{item.number}</h1>

      <OrderHeader item={item} status={status} />

      <p className="text text_type_main-medium mb-2">Состав:</p>

      <section className={styles.ingredients}>
        <ul>
          {orderIngredients.map((ingredient) => (
            <IngredientRow
              key={`${ingredient._id}-${ingredient.count}`}
              item={ingredient}
            />
          ))}
        </ul>
      </section>

      <section
        className={`text text_type_main-default mt-10 mb-6 ${styles.order}`}
      >
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate
            date={new Date(item.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        </p>

        <div className={styles.price}>
          <span className={`text text_type_digits-default mr-2`}>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </main>
  );
};
