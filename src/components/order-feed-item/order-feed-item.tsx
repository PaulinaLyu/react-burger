import { useMemo, useCallback } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router";

import styles from "./order-feed-item.module.css";
import { FeedItem, Ingredient } from "../../models";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { calculateOrderTotal, getOrderStatus } from "../../utils";
import { setCurrentOrder } from "../../services/reducers/curent-order.reducer";

interface IOrdersFeedItemProp {
  order: FeedItem;
  isUser?: boolean;
}

const MAX_VISIBLE_ITEMS = 6;

const OrderHeader = ({ order }: { order: FeedItem }) => (
  <div className={styles.header}>
    <p className="text text_type_digits-default">#{order.number}</p>
    <FormattedDate
      date={new Date(order.createdAt)}
      className="text text_type_main-default text_color_inactive"
    />
  </div>
);

const OrderStatus = ({
  order,
  isUser,
}: {
  order: FeedItem;
  isUser?: boolean;
}) => {
  const status = useMemo(() => getOrderStatus(order), [order]);
  const color =
    order.status === "done" ? styles.status_done : styles.status_default;

  if (!isUser || !status) return null;

  return (
    <p className={`${color} mt-2 text text_type_main-default`}>{status}</p>
  );
};

const IngredientImage = ({
  item,
  index,
  totalIngredients,
}: {
  item: Ingredient;
  index: number;
  totalIngredients: number;
}) => {
  const hiddenCount = totalIngredients - MAX_VISIBLE_ITEMS;
  const isLastVisible = index === MAX_VISIBLE_ITEMS - 1;
  const shouldShowOverlay = isLastVisible && hiddenCount > 0;

  return (
    <li style={{ marginRight: -20 }} className={styles.image}>
      <img
        style={{ opacity: shouldShowOverlay ? "0.4" : "1" }}
        src={item.image_mobile}
        alt={item.name}
        className={styles.image_position}
      />
      {shouldShowOverlay && (
        <span className={`${styles.count_hidden} text text_type_main-default`}>
          +{hiddenCount}
        </span>
      )}
    </li>
  );
};

export const OrderFeedItem = ({ order, isUser }: IOrdersFeedItemProp) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data: ingredients } = useAppSelector(
    (state) => state.burgerIngredients
  );

  const orderIngredients = useMemo(() => {
    if (!ingredients || !order.ingredients) return [];

    return order.ingredients
      .map((id: string) =>
        ingredients.find((item: Ingredient) => item._id === id)
      )
      .filter((item): item is Ingredient => item !== undefined);
  }, [ingredients, order]);

  const total = useMemo(
    () => calculateOrderTotal(orderIngredients),
    [orderIngredients]
  );

  const displayedItems = useMemo(() => {
    const uniqueItems = orderIngredients.reduce(
      (acc: Ingredient[], item: Ingredient) => {
        if (!acc.some((i) => i._id === item._id)) {
          acc.push(item);
        }
        return acc;
      },
      []
    );
    return uniqueItems.slice(0, MAX_VISIBLE_ITEMS);
  }, [orderIngredients]);

  const handleClickLink = useCallback(() => {
    dispatch(setCurrentOrder(order));
  }, [dispatch, order]);

  if (!order) {
    return <div className={`${styles.order} p-6 mb-6`}>Заказ не найден</div>;
  }

  return (
    <Link
      className={`${styles.order} p-6 mb-6`}
      to={`${location.pathname}/${order.number}`}
      state={{ backgroundLocation: location }}
      onClick={handleClickLink}
    >
      <OrderHeader order={order} />

      <p className="mt-4 text text_type_main-medium">{order.name}</p>

      <OrderStatus order={order} isUser={isUser} />

      <div className={styles.wrapper}>
        <ul className={styles.ingredients}>
          {displayedItems.map((item, index) => (
            <IngredientImage
              key={item._id}
              item={item}
              index={index}
              totalIngredients={order.ingredients.length}
            />
          ))}
        </ul>

        <div className={styles.price}>
          <span className="text text_type_digits-default">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
