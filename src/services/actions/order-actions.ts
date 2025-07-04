import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../api";

export const createBurderOrder = createAsyncThunk<number>(
  "data/createOrder",
  async (ingredients) => {
    return createOrder(ingredients);
  }
);
