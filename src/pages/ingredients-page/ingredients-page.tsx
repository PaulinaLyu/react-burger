import { useEffect } from "react";
import { useParams } from "react-router";
import { IngredientDetails } from "../../components/ingredient-details";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchBurgerIngredients } from "../../services/actions";
import { setCurrentIngredient } from "../../services/reducers/ingredient-details.reducer";
import { Ingredient } from "../../models";

export const IngredientsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentIngredient } = useAppSelector(
    (state) => state.ingredientDetails
  );
  const { data: ingredients } = useAppSelector(
    (state) => state.burgerIngredients
  );

  useEffect(() => {
    const fetchAndSetIngredient = async () => {
      if (currentIngredient || !id) return;

      const findAndSet = (list: Ingredient[]) => {
        const found = list.find((item) => item._id === id);
        if (found) {
          dispatch(setCurrentIngredient(found));
        }
      };

      try {
        if (!ingredients || ingredients.length === 0) {
          const fetchedIngredients = await dispatch(
            fetchBurgerIngredients()
          ).unwrap();
          findAndSet(fetchedIngredients);
        } else {
          findAndSet(ingredients);
        }
      } catch (error) {
        console.error("Ошибка при загрузке ингредиентов:", error);
      }
    };

    fetchAndSetIngredient();
  }, [dispatch, id, currentIngredient, ingredients]);

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
