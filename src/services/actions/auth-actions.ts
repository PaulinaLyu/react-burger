import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, resetPassword, loginUser } from "../../api";
import { User } from "../../models";

export const loginUserThunk = createAsyncThunk<Omit<User, "name">>(
  "data/loginUser",
  async (form) => {
    return loginUser(form);
  }
);

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
