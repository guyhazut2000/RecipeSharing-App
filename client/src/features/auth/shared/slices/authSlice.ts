import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isFetching: false,
    isError: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
      state.isError = false;
    },
    loginFailure: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isLoggedIn = false;
    },
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isFetching = false;
      state.isError = false;
    },
    logoutFailure: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isLoggedIn = false;
    },

    resetState: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isFetching = false;
      state.isError = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  resetState,
} = authSlice.actions;
export default authSlice.reducer;
