import { combineReducers } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./burger-ingredients.reducer";
import burgerConstructorReducer from "./burger-constructor.reducer";
import currentOrderReducer from "./curent-order.reducer";
import orderReducer from "./order/order.reducer";
import authReducer from "./auth.reducer";
import { feedWs, profileWs } from "../wsSlices";

export type RootState = {
  burgerIngredients: ReturnType<typeof burgerIngredientsReducer>;
  burgerConstructor: ReturnType<typeof burgerConstructorReducer>;
  currentOrder: ReturnType<typeof currentOrderReducer>;
  order: ReturnType<typeof orderReducer>;
  auth: ReturnType<typeof authReducer>;
  wsFeed: ReturnType<typeof feedWs.reducer>;
  wsProfile: ReturnType<typeof profileWs.reducer>;
};

type RootAction = PayloadAction<unknown>;

const reducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentOrder: currentOrderReducer,
  order: orderReducer,
  auth: authReducer,
  wsFeed: feedWs.reducer,
  wsProfile: profileWs.reducer,
});

export const rootReducer = (state: RootState | undefined, action: RootAction) =>
  reducer(state, action);
