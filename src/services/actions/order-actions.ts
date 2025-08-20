import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../api";

export const createBurgerOrder = createAsyncThunk<number, string[]>(
  "data/createOrder",
  async (ingredients) => {
    return createOrder(ingredients);
  }
);
