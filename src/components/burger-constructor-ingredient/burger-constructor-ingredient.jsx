import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import propTypes from "prop-types";
import { dataTypes } from "../../data/data-types";
import { useAppDispatch } from "../../hooks";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-ingredient.module.css";
import { swapIngredients } from "../../services/reducers/burger-constructor.reducer";

export const BurgerConstructorIngredient = ({ item, index, onDelete }) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [, drag] = useDrag({
    type: "sort",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "sort",
    drop(item) {
      if (index !== item.index) {
        dispatch(swapIngredients([index, item.index]));
      }
    },
  });

  drag(drop(ref));

  return (
    <li className={`${styles.item} mt-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        extraClass={`${styles.ingredient} ml-2`}
        handleClose={() => onDelete(item._id)}
      />
    </li>
  );
};

BurgerConstructorIngredient.propTypes = {
  item: dataTypes.isRequired,
  index: propTypes.number,
  onDelete: propTypes.func.isRequired,
};
