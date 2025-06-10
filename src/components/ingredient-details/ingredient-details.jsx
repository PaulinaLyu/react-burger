import PropTypes from "prop-types";
import { Modal } from "../modal";
import { NutritionInfo } from "../nutrition-info";
import { dataTypes } from "../../data/data-types";
import styles from "./ingredient-details.module.css";

export const IngredientDetails = ({ item, onClose }) => {
  const nutrients = [
    { label: "Калории, ккал", value: item.calories },
    { label: "Белки, г", value: item.proteins },
    { label: "Жиры, г", value: item.fat },
    { label: "Углеводы, г", value: item.carbohydrates },
  ];

  return (
    <Modal title="Детали ингридиента" onClose={onClose}>
      <main>
        <figure className="mb-4">
          <img
            src={item.image_large}
            alt={`Изображение ингредиента ${item.name}`}
          />
          <figcaption className="text text_type_main-medium mb-8">
            {item.name}
          </figcaption>
        </figure>

        <article className={`${styles.nutrition} mb-15 mr-10 ml-10`}>
          {nutrients.map((nutrient, index) => (
            <NutritionInfo
              key={index}
              label={nutrient.label}
              value={nutrient.value}
            />
          ))}
        </article>
      </main>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  item: dataTypes.isRequired,
  onClose: PropTypes.func.isRequired,
};
