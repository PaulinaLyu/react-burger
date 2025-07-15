import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, resetPassword } from "../../api";
import { User } from "../../models";

export const registerUserThunk = createAsyncThunk<User>(
  "data/registerUser",
  async (form) => {
    return registerUser(form);
  }
);

export const resetPasswordThunk = createAsyncThunk<any>(
  "data/resetPassword",
  async (form) => {
    return resetPassword(form);
  }
);
