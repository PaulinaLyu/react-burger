import { DOMAIN, ORDER_API } from "./constants";
import { requestWithRefresh, getCookie } from "../utils";
import { OrderResponse } from "../types";

export const createOrder = async (ingredients: string[]) => {
  const result = await requestWithRefresh<OrderResponse>(
    `${DOMAIN}${ORDER_API}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ ingredients }),
    }
  );

  if (!result?.order?.number) {
    throw new Error(
      "Ошибка, заказ не был оформлен. Свяжитесь с администратором."
    );
  }

  return result.order.number;
};
