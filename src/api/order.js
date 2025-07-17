import { DOMAIN, ORDER_API } from "./constants";
import { request } from "../utils";

export const createOrder = async (ingredients) => {
  const result = await request(`${DOMAIN}${ORDER_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients }),
  });

  if (!result?.order?.number) {
    throw new Error(
      "Ошибка, заказ не был оформлен. Свяжитесь с администратором."
    );
  }

  return result.order.number;
};
