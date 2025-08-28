import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../../api";
import { fetchOrderById } from "../../../api/order";
import { FeedItem } from "../../../models";

export const createBurgerOrder = createAsyncThunk<number, string[]>(
  "data/createOrder",
  async (ingredients) => {
    return createOrder(ingredients);
  }
);

export const getOrderById = createAsyncThunk<FeedItem, string>(
  "data/getOrderById",
  async (id) => {
    return fetchOrderById(id);
  }
);
