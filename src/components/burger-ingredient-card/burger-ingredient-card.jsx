import PropTypes from "prop-types";
import styles from "./burger-ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataTypes } from "../../data/data-types";

export const BurgerIngredientCard = ({ item, onClick }) => {
  return (
    <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={onClick}>
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
    </li>
  );
};

BurgerIngredientCard.propTypes = {
  item: dataTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
