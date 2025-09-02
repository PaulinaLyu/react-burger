import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-ingredient.module.css";
import { swapIngredients } from "../../services/reducers/burger-constructor/burger-constructor.reducer";
import { IngredientWithUniqueId } from "../../models";

interface IBurgerConstructorIngredient {
  item: IngredientWithUniqueId;
  index: number;
  onDelete: (id: string) => void;
}

export const BurgerConstructorIngredient = ({
  item,
  index,
  onDelete,
}: IBurgerConstructorIngredient) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [, drag] = useDrag({
    type: "sort",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "sort",
    drop(item: any) {
      if (index !== item.index) {
        dispatch(swapIngredients([item.index, index]));
      }
    },
  });

  drag(drop(ref));

  return (
    <li
      data-testid="constructor-ingredient"
      className={`${styles.item} mt-4`}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        extraClass={`${styles.ingredient} ml-2`}
        handleClose={() => onDelete(item.uniqueId)}
      />
    </li>
  );
};
