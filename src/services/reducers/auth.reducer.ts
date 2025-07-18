import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ERROR_LOGIN, ERROR_REGISTRATION } from "../../contants";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  updateUserThunk,
  getUserThunk,
  approvedResetPasswordThunk,
} from "../actions/auth-actions";
import { deleteCookie, setCookie } from "../../utils";
import { userStorageService } from "../userStorageService";

export interface AuthState {
  isLoading: boolean;
}

const initialState: AuthState = {
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
          const accessToken = action.payload.accessToken.split("Bearer ")[1];
          const refreshToken = action.payload.refreshToken;
          if (accessToken) {
            setCookie("accessToken", accessToken);
          }

          if (refreshToken && accessToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }

          if (action.payload.user) {
            userStorageService.setUser(action.payload.user);
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
          const accessToken = action.payload.accessToken.split("Bearer ")[1];
          const refreshToken = action.payload.refreshToken;

          if (accessToken) {
            setCookie("accessToken", accessToken);
          }

          if (refreshToken && accessToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }

          if (action.payload.user) {
            userStorageService.setUser(action.payload.user);
          }
          state.isLoading = false;
        }
      )
      .addMatcher(isRejected(loginUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_LOGIN}:  ${action.error.message}`);
      })
      .addMatcher(isPending(logoutUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled(logoutUserThunk), (state) => {
        localStorage.removeItem("refreshToken");
        userStorageService.removeUser();
        deleteCookie("accessToken");
        state.isLoading = false;
      })
      .addMatcher(isRejected(logoutUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${action.error.message}`);
      })
      .addMatcher(isPending(updateUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isFulfilled(updateUserThunk),
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          userStorageService.setUser(action.payload.user);
        }
      )
      .addMatcher(isRejected(updateUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${action.error.message}`);
      })
      .addMatcher(
        isFulfilled(getUserThunk),
        (_, action: PayloadAction<any>) => {
          userStorageService.setUser(action.payload.user);
        }
      )
      .addMatcher(isRejected(getUserThunk), (_, action) => {
        toast.error(`${action.error.message}`);
      })
      .addMatcher(isRejected(approvedResetPasswordThunk), (_, action) => {
        toast.error(`${action.error.message}`);
      });
  },
});

export default authSlice.reducer;
