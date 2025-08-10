import { DOMAIN, INGREDIENTS_API } from "./constants";
import { request } from "../utils";
import { Ingredient } from "../models";
import { ResponseWithOptionalSuccess } from "../types";

interface DataType extends ResponseWithOptionalSuccess {
  data: Ingredient[];
}

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const result = await request<DataType>(`${DOMAIN}${INGREDIENTS_API}`);

  if (!Array.isArray(result.data) || result.data.length === 0) {
    throw new Error("Невалидные данные: пустой массив ингредиентов");
  }

  return result.data;
};
