import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInitials: null
  },
  reducers: {
    setUserInitials: (state, action) => {
      state.userInitials = action.payload.userInitials;
    },
  },
});

export const { setUserInitials } = userSlice.actions;
export default userSlice.reducer;

export const selectUserInitials = (state) => state.user.userInitials;

