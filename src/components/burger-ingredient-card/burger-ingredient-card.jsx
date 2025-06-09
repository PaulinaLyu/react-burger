import { useState } from "react";
import styles from "./burger-ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientDetails } from "../ingredient-details";
import { dataTypes } from "../../data/data-types";

export const BurgerIngredientCard = ({ item }) => {
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);

  const showDetailModal = () => setIsShowDetailModal(true);
  const hideDetailModal = () => setIsShowDetailModal(false);

  return (
    <li
      className={`${styles.card} mt-6 mb-8 ml-3 mr-2`}
      onClick={showDetailModal}
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
      {isShowDetailModal && (
        <IngredientDetails item={item} onClose={hideDetailModal} />
      )}
    </li>
  );
};

BurgerIngredientCard.propTypes = {
  item: dataTypes.isRequired,
};
