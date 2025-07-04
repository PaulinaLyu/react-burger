import { STATUS_OK, DOMAIN, INGREDIENTS_API } from "../contants";

export const fetchIngredients = async () => {
  const response = await fetch(`${DOMAIN}${INGREDIENTS_API}`);

  if (response.status !== STATUS_OK) {
    throw new Error(`HTTP ошибка: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Ошибка сервера");
  }

  if (!Array.isArray(result.data) || result.data.length === 0) {
    throw new Error("Невалидные данные: пустой массив ингредиентов");
  }

  return result.data;
};
