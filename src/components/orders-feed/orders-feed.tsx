import { FeedItem, IOrdersFeed } from "../../models";
import { OrderFeedItem } from "../order-feed-item";
import styles from "./orders-feed.module.css";

interface IOrdersFeedProps {
  data: IOrdersFeed;
  isUser?: boolean;
}

export const OrdersFeed = ({ data, isUser = false }: IOrdersFeedProps) => {
  return (
    <div className={`${styles.feed} mt-4 mb-4`}>
      {data.orders &&
        data.orders.map((item: FeedItem) => (
          <OrderFeedItem key={item._id} order={item} isUser={isUser} />
        ))}
    </div>
  );
};
