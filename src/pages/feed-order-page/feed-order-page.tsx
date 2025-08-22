import { useParams } from "react-router";
import { OrderInfo } from "../../components/order-info/order-info";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getOrderById } from "../../services/actions";
import { Loader } from "../../components";

export const FeedOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  debugger;
  const orders = useAppSelector(
    (state) =>
      state.wsFeed.messages?.orders ?? state.wsProfile.messages?.orders ?? []
  );
  const order = orders.find((item) => item._id === id);
  const { isLoading, currentOrder } = useAppSelector(
    (state) => state.currentOrder
  );

  useEffect(() => {
    if (!order) {
      dispatch(getOrderById(String(id)));
    }
  }, [order, id, dispatch]);
  debugger;
  if (order) {
    return <OrderInfo item={order} />;
  }

  if (currentOrder) {
    return <OrderInfo item={currentOrder} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <div>Такого заказа не существует</div>;
};
