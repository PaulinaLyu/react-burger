import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ERROR_LOGIN, ERROR_REGISTRATION } from "../../contants";
import { registerUserThunk, loginUserThunk } from "../actions/auth-actions";
import { UserWithoutPassword } from "../../models";
import { setCookie } from "../../utils";

export interface AuthState {
  user: UserWithoutPassword;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    name: "",
    email: "",
  },
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isPending(registerUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isFulfilled(registerUserThunk),
        (state, action: PayloadAction<any>) => {
          state.user = action.payload.user;
          const accessToken = action.payload.accessToken.split("Bearer ")[1];
          const refreshToken = action.payload.refreshToken;

          if (accessToken) {
            setCookie("accessToken", accessToken);
          }

          if (refreshToken && accessToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
          state.isLoading = false;
        }
      )
      .addMatcher(isRejected(registerUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_REGISTRATION}:  ${action.error.message}`);
      })
      .addMatcher(isPending(loginUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isFulfilled(loginUserThunk),
        (state, action: PayloadAction<any>) => {
          state.user = action.payload.user;
          const accessToken = action.payload.accessToken.split("Bearer ")[1];
          const refreshToken = action.payload.refreshToken;
          if (accessToken) {
            setCookie("accessToken", accessToken);
          }

          if (refreshToken && accessToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
          state.isLoading = false;
        }
      )
      .addMatcher(isRejected(loginUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_LOGIN}:  ${action.error.message}`);
      });
  },
});

export default authSlice.reducer;
