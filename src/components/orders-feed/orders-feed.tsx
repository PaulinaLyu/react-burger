import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FeedItem, IOrdersFeed } from "../../models";
import { resetCurrentOrder } from "../../services/reducers/curent-order.reducer";

import { Modal } from "../modal";
import { OrderFeedItem } from "../order-feed-item";
import { OrderInfo } from "../order-info/order-info";
import styles from "./orders-feed.module.css";
import { RouterPaths } from "../../utils";

interface IOrdersFeedProps {
  data: IOrdersFeed;
  isUser?: boolean;
}

export const OrdersFeed = ({ data, isUser = false }: IOrdersFeedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentOrder } = useAppSelector((state) => state.currentOrder);

  const hideDetailsModal = () => {
    const navigatePath = location.pathname.includes(RouterPaths.FEED)
      ? RouterPaths.FEED
      : RouterPaths.PROFILE + "/" + RouterPaths.PROFILE_ORDERS;

    navigate(navigatePath, {
      state: {
        backgroundLocation: null,
      },
    });

    dispatch(resetCurrentOrder());
  };

  return (
    <div className={`${styles.feed} mt-4 mb-4`}>
      {data.orders &&
        data.orders.map((item: FeedItem) => (
          <OrderFeedItem key={item._id} order={item} isUser={isUser} />
        ))}
      {currentOrder && (
        <Modal onClose={hideDetailsModal}>
          <OrderInfo item={currentOrder} />
        </Modal>
      )}
    </div>
  );
};
