import { useEffect, useMemo } from "react";
import styles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedItem, Ingredient, IngredientWithCount } from "../../models";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { calculateOrderTotal, getOrderStatus } from "../../utils";
import { fetchBurgerIngredients } from "../../services/actions";

interface IOrderInfoProps {
  item: FeedItem;
}

export const OrderInfo = ({ item }: IOrderInfoProps) => {
  const dispatch = useAppDispatch();
  const { data: ingredients } = useAppSelector(
    (state) => state.burgerIngredients
  );

  const status = useMemo(() => getOrderStatus(item), [item]);

  const orderIngredients = useMemo(() => {
    if (item === null || !ingredients || ingredients?.length === 0) {
      return null;
    }
    let group: Record<string, IngredientWithCount> = {};
    for (let ingredientId of item?.ingredients) {
      let ingredient = ingredients.find(
        (elem: Ingredient) => elem._id === ingredientId
      );
      if (ingredient) {
        if (!group[ingredientId]) {
          group[ingredientId] = { ...ingredient, count: 0 };
        }
        group[ingredientId].count += 1;
      }
    }

    let res: IngredientWithCount[] = [];
    for (let el of item!.ingredients) {
      if (group[el]) {
        res.push(group[el]);
        delete group[el];
      }
    }

    return res;
  }, [ingredients, item]);

  const total = useMemo(
    () => calculateOrderTotal(orderIngredients),
    [orderIngredients]
  );

  useEffect(() => {
    if (!ingredients || ingredients?.length === 0) {
      dispatch(fetchBurgerIngredients());
    }
  }, [dispatch, ingredients]);

  return (
    <main>
      {item && (
        <>
          <p className="text text_type_digits-default mb-10">#{item?.number}</p>
          <p className="text text_type_main-medium mb-3">{item?.name}</p>
          <p className={`text text_type_main-default mb-10 ${styles.status}`}>
            {status}
          </p>
          <p className="text text_type_main-medium mb-2">{"Состав:"}</p>
          <section className={styles.ingredients}>
            {orderIngredients &&
              orderIngredients.map((item) => {
                return (
                  <li key={item._id} className="mt-4 mr-6">
                    <div className={styles.row}>
                      <div className={styles.image_name}>
                        <div className={styles.image}>
                          <img src={item!.image_mobile} alt={item?.name} />
                        </div>
                        <p
                          className={`text text_type_main-default ml-4 ${styles.pname}`}
                        >
                          {item.name}
                        </p>
                      </div>
                      <div className={styles.count_price}>
                        <span className="text text_type_digits-default mr-2">{`${item?.count} x ${item?.price}`}</span>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </li>
                );
              })}
          </section>
          <section
            className={`text text_type_main-default mt-10 mb-6 ${styles.order}`}
          >
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate
                date={new Date(item?.createdAt)}
                className="text text_type_main-default text_color_inactive"
              />
            </p>

            <div className={styles.price}>
              <span className={`text text_type_digits-default mr-2`}>
                {total}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </>
      )}
    </main>
  );
};
