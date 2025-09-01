import { Ingredient } from "../../models";
import { NutritionInfo } from "../nutrition-info";
import styles from "./ingredient-details.module.css";

interface IIngredientDetailsProps {
  item: Ingredient;
}

export const IngredientDetails = ({ item }: IIngredientDetailsProps) => {
  const nutrients = [
    { label: "Калории, ккал", value: item.calories },
    { label: "Белки, г", value: item.proteins },
    { label: "Жиры, г", value: item.fat },
    { label: "Углеводы, г", value: item.carbohydrates },
  ];

  return (
    <main>
      <figure className="mb-4">
        <img
          src={item.image_large}
          alt={`Изображение ингредиента ${item.name}`}
        />
        <figcaption
          data-testid="figcaption-ingredient-name"
          className="text text_type_main-medium mb-8"
        >
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
  );
};
