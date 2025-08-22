import { useMemo } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router";

import styles from "./order-feed-item.module.css";
import { FeedItem, Ingredient } from "../../models";

import { useAppSelector } from "../../hooks";

interface IOrdersFeedItemProp {
  order: FeedItem;
  isUser?: boolean;
}

const MAX_VISIBLE_ITEMS = 6;

export const OrderFeedItem = ({ order, isUser }: IOrdersFeedItemProp) => {
  const location = useLocation();

  const { data: ingredients } = useAppSelector(
    (state) => state.burgerIngredients
  );

  const orderIngredients = useMemo(
    () =>
      order.ingredients.map((id: string) => {
        return ingredients.find((item: Ingredient) => item._id === id);
      }),
    [ingredients, order]
  );

  const status = useMemo(
    () =>
      order.status === "done"
        ? "Выполнен"
        : order.status === "created"
        ? "Создан"
        : "Готовится",
    [order]
  );

  const total = useMemo(
    () =>
      orderIngredients.reduce(
        (total: number, item: Ingredient | undefined) => item!.price + total,
        0
      ),
    [orderIngredients]
  );

  const color = useMemo(
    () =>
      order.status === "done" ? styles.status_done : styles.status_default,
    [order]
  );

  const displayedItems = useMemo(
    () => orderIngredients.slice(0, MAX_VISIBLE_ITEMS),
    [orderIngredients]
  );

  return (
    <Link
      className={`${styles.order} p-6 mb-6`}
      to={`${location.pathname}/${order.number}`}
      state={{ location: location }}
    >
      <div className={styles.header}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>

      <p className={`mt-4 text text_type_main-medium`}>{order.name}</p>
      {isUser && status && (
        <p className={`${color} text text_type_main-default`}>{status}</p>
      )}
      <div className={styles.wrapper}>
        <div className={styles.ingredients}>
          {displayedItems &&
            displayedItems.map((item: Ingredient | undefined, i: number) => {
              const right = -20;
              const hiddenCount = order.ingredients.length - MAX_VISIBLE_ITEMS;

              return (
                <li
                  key={item?._id}
                  style={{ marginRight: right }}
                  className={styles.image}
                >
                  <img
                    style={{
                      opacity:
                        MAX_VISIBLE_ITEMS === i + 1 && hiddenCount > 0
                          ? "0.4"
                          : "1",
                    }}
                    src={item?.image_mobile}
                    alt={item?.name}
                    className={styles.image_position}
                  />
                  {hiddenCount > 0 && i === MAX_VISIBLE_ITEMS - 1 && (
                    <span
                      className={`${styles.count_hidden} text text_type_main-default`}
                    >
                      +{hiddenCount}
                    </span>
                  )}
                </li>
              );
            })}
        </div>
        <div className={styles.price}>
          <span className={`text text_type_digits-default`}>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
