import { FeedItem } from "../models";

export const getOrderStatus = (order: FeedItem | null): string | null => {
  if (!order) return null;
  switch (order.status) {
    case "done":
      return "Выполнен";
    case "created":
      return "Создан";
    default:
      return "Готовится";
  }
};
