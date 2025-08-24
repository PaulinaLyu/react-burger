import { FeedItem } from "../models";

export const getOrderStatus = (order: FeedItem | null): string => {
  if (!order) return "";
  switch (order.status) {
    case "done":
      return "Выполнен";
    case "created":
      return "Создан";
    default:
      return "Готовится";
  }
};
