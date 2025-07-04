import { STATUS_OK, DOMAIN, ORDER_API } from "../contants";

export const createOrder = async (ingredients) => {
  const response = await fetch(`${DOMAIN}${ORDER_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients: ingredients }),
  });

  if (response.status !== STATUS_OK) {
    throw new Error(`HTTP ошибка: ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Ошибка сервера");
  }

  if (!result?.order?.number) {
    throw new Error(
      "Ошибка, заказ не был оформлен. Свяжитесь с администратором."
    );
  }
  return result?.order?.number;
};
