import styles from "./burger-ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../models";
import { useCallback } from "react";

interface IBurgerIngredientCardProps {
  count: number;
  onClick: () => void;
  item: Ingredient;
}

export const BurgerIngredientCard = ({
  item,
  onClick,
  count,
}: IBurgerIngredientCardProps) => {
  const [{ opacity }, dragRef] = useDrag({
    type: item.type,
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const cardDragRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (node) dragRef(node);
    },
    [dragRef]
  );

  return (
    <li
      style={{ opacity }}
      className={`${styles.card} mt-6 mb-8 ml-3 mr-2`}
      onClick={onClick}
      ref={cardDragRef}
    >
      <img
        className={`${styles.image} ml-4 mr-4 mb-1`}
        src={item.image}
        alt={item.name}
      />
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.title} text text_type_main-default`}>
        {item.name}
      </div>
      {count > 0 && (
        <Counter count={count} size="default" extraClass={styles.count} />
      )}
    </li>
  );
};
