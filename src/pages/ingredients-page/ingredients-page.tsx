import { useParams } from "react-router";
import { IngredientDetails } from "../../components/ingredient-details";
import { useAppSelector } from "../../hooks";

export const IngredientsPage = () => {
  const { id } = useParams();

  const { data: ingredients } = useAppSelector(
    (state) => state.burgerIngredients
  );

  const foundIngredient = ingredients.find((item) => item._id === id);

  return (
    <div className="text-align-center">
      <h1>Детали ингредиента</h1>
      {foundIngredient ? (
        <IngredientDetails item={foundIngredient} />
      ) : (
        <div>Такого ингредиента не существует</div>
      )}
    </div>
  );
};
