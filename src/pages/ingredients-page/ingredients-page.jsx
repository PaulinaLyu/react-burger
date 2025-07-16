import { IngredientDetails } from "../../components/ingredient-details";
import { useAppSelector } from "../../hooks";

export const IngredientsPage = () => {
  const { currentIngredient } = useAppSelector(
    (state) => state.ingredientDetails
  );

  return (
    <div className="text-align-center">
      <h1>Детали ингредиента</h1>
      {currentIngredient ? (
        <IngredientDetails item={currentIngredient} />
      ) : (
        <div>Такого ингредиента не существует</div>
      )}
    </div>
  );
};
