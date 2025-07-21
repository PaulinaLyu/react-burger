import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../api";

export const createBurgerOrder = createAsyncThunk<number>(
  "data/createOrder",
  async (ingredients) => {
    return createOrder(ingredients);
  }
);
