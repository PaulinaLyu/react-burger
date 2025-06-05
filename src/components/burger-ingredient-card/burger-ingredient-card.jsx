import PropTypes from "prop-types";
import styles from "./burger-ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerIngredientCard = ({ img, title, price }) => {
  return (
    <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`}>
      <img className={`${styles.image} ml-4 mr-4 mb-1`} src={img} alt={title} />
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.title} text text_type_main-default`}>
        {title}
      </div>
    </li>
  );
};

BurgerIngredientCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
