import { useParams } from "react-router";
import { useEffect } from "react";
import { OrderInfo } from "../../components/order-info/order-info";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOrderById } from "../../services/actions";
import { Loader } from "../../components";

export const FeedOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const feedOrders = useAppSelector((state) => state.wsFeed.messages?.orders);
  const profileOrders = useAppSelector(
    (state) => state.wsProfile.messages?.orders
  );
  const orders = feedOrders || profileOrders || [];
  const order = orders.find((item) => item._id === id);

  const { isLoading, currentOrder, error } = useAppSelector(
    (state) => state.currentOrder
  );
  const orderToDisplay = order || currentOrder;

  useEffect(() => {
    if (!orderToDisplay && id && !isLoading) {
      dispatch(getOrderById(id || ""));
    }
  }, [orderToDisplay, id, isLoading, dispatch]);

  if (orderToDisplay) {
    return <OrderInfo item={orderToDisplay} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка загрузки заказа: {error}</div>;
  }

  return <div>Такого заказа не существует</div>;
};
