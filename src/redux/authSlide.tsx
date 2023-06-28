import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    isLogin: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;

    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.token = null;
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLogin = false; 
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
