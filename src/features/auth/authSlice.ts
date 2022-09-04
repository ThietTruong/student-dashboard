import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models';

export interface LoginPayload {
  username: string;
  password: string;
}
export interface AuthState {
  isLogin: boolean;
  logging?: boolean;
  currentUser?: User;
}
const initialState: AuthState = {
  isLogin: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginFail(state, action: PayloadAction<User>) {
      state.logging = false;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.logging = false;
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.currentUser = undefined;
    },
  },
});

//action
export const authActions = authSlice.actions;

//select
export const selectIsLooggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.isLogging;

//reducer
const authReducer = authSlice.reducer;
export default authReducer;
