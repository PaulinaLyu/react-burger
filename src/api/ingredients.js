import { DOMAIN, INGREDIENTS_API } from "./constants";
import { request } from "../utils";

export const fetchIngredients = async () => {
  const result = await request(`${DOMAIN}${INGREDIENTS_API}`);

  if (!Array.isArray(result.data) || result.data.length === 0) {
    throw new Error("Невалидные данные: пустой массив ингредиентов");
  }

  return result.data;
};
