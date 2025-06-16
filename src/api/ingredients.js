const DOMAIN = "https://norma.nomoreparties.space";
const INGREDIENTS_API = "/api/ingredients";
const STATUS_OK = 200;

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
