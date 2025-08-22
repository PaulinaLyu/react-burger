import { Ingredient } from "../models";

export const calculateOrderTotal = (
  orderIngredients: (Ingredient | undefined)[] | null
): number | null => {
  if (!orderIngredients) return null;
  return orderIngredients.reduce(
    (total, item) => total + (item?.price || 0),
    0
  );
};
