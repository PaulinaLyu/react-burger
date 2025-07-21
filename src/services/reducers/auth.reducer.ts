import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
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
      .addMatcher(isFulfilled(registerUserThunk), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected(registerUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_REGISTRATION}:  ${action.error.message}`);
      })
      .addMatcher(isPending(loginUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled(loginUserThunk), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected(loginUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_LOGIN}:  ${action.error.message}`);
      })
      .addMatcher(isPending(logoutUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled(logoutUserThunk), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected(logoutUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${action.error.message}`);
      })
      .addMatcher(isPending(updateUserThunk), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled(updateUserThunk), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected(updateUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${action.error.message}`);
      })
      .addMatcher(isRejected(getUserThunk), (_, action) => {
        toast.error(`${action.error.message}`);
      })
      .addMatcher(isRejected(approvedResetPasswordThunk), (_, action) => {
        toast.error(`${action.error.message}`);
      });
  },
});

export default authSlice.reducer;
