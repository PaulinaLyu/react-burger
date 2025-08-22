import { DOMAIN, ORDER_API } from "./constants";
import { requestWithRefresh, getCookie, request } from "../utils";
import { OrderResponse, ResponseWithOptionalSuccess } from "../types";
import { FeedItem } from "../models";

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

interface DataType extends ResponseWithOptionalSuccess {
  orders: FeedItem[];
}

export const fetchOrderById = async (id: string): Promise<FeedItem> => {
  const result = await request<DataType>(`${DOMAIN}${ORDER_API}/${id}`);
  return result?.orders?.[0];
};
