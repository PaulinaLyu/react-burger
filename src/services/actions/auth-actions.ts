import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  getUser,
  updateUser,
  resetPassword,
  loginUser,
  approvedResetPassword,
  logoutUser,
} from "../../api";
import { User } from "../../models";
import { processAuthData } from "../../utils/authUtils";
import { userStorageService } from "../userStorageService";
import { deleteCookie } from "../../utils";

export const logoutUserThunk = createAsyncThunk(
  "data/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUser();
      localStorage.removeItem("refreshToken");
      userStorageService.removeUser();
      deleteCookie("accessToken");
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk<
  Omit<User, "name">,
  { rejectValue: string }
>("data/loginUser", async (form, thunkAPI) => {
  try {
    const response = await loginUser(form);
    processAuthData(response);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerUserThunk = createAsyncThunk<User>(
  "data/registerUser",
  async (form, thunkAPI) => {
    try {
      const response = await registerUser(form);
      processAuthData(response);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const approvedResetPasswordThunk = createAsyncThunk<any>(
  "data/resetPassword",
  async (form) => {
    return approvedResetPassword(form);
  }
);

export const resetPasswordThunk = createAsyncThunk<any>(
  "data/resetPassword",
  async (form) => {
    return resetPassword(form);
  }
);

export const getUserThunk = createAsyncThunk(
  "data/getUser",
  async (_, thunkAPI) => {
    try {
      const response = await getUser();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk<User>(
  "data/updateUser",
  async (form, thunkAPI) => {
    try {
      const response = await updateUser(form);
      userStorageService.setUser(response.user);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
