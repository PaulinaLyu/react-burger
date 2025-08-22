import { useEffect } from "react";
import { OrdersFeed } from "../orders-feed";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBurgerIngredients } from "../../services/actions";

import { Loader } from "../loader";
import { ERROR_WS } from "../../contants";
import { profileWsActions } from "../../services/wsSlices";

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();
  const { connected, messages, error } = useAppSelector(
    (state) => state.wsProfile
  );

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
    dispatch(profileWsActions.wsInit({ withToken: true }));
    return () => {
      dispatch(profileWsActions.wsEnd());
    };
  }, [dispatch]);

  return (
    <>
      {!connected && <Loader />}
      {!!error && (
        <p className={`mb-2 text text_type_main-default`}>{ERROR_WS}</p>
      )}
      {connected && !!messages && <OrdersFeed data={messages} isUser />}
    </>
  );
};
