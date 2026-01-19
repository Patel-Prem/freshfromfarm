import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    isLoggedOut: false, // tracks explicit logout
    isLoggedIn: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedOut = false; // reset on new login/refresh
      state.isLoggedIn = true; // reset on new login/refresh
    },
    logOut: (state) => {
      state.accessToken = null;
      state.isLoggedOut = true; // explicit logout
      state.isLoggedIn = false; // explicit logout
    },
    clearLogoutFlag: (state) => {
      state.isLoggedOut = false; // optional helper to reset flag
      state.isLoggedIn = false; // optional helper to reset flag
    },
  },
});

export const { setAccessToken, logOut, clearLogoutFlag } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectIsLoggedOut = (state) => state.auth.isLoggedOut;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
