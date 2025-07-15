import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ERROR_PLACE_ORDER } from "../../contants";
import { registerUserThunk } from "../actions/auth-actions";
import { User, UserWithoutPassword } from "../../models";

export interface AuthState {
    user: UserWithoutPassword
    isLoading: boolean
}

const initialState: AuthState = {
    user: {
        name:'',
        email:''
    },
    isLoading: false
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
        (state, action: PayloadAction<User>) => {
        debugger
          state.isLoading = false;
        }
      )
      .addMatcher(isRejected(registerUserThunk), (state, action) => {
        state.isLoading = false;
        toast.error(`${ERROR_PLACE_ORDER}:  ${action.error.message}`);
      });
  },
});


export default authSlice.reducer;
