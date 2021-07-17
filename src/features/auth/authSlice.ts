import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "models";

export interface AuthState {
  isLoggedIn?: boolean;
  logging?: boolean;
  currentUser?: User
}

export interface LoginPayload {
  username: string;
  password: string;
}


const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    }
  }
})


export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

const authReducer = authSlice.reducer;
export default authReducer;