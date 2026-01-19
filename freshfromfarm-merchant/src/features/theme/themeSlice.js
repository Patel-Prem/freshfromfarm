import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isLightTheme: JSON.parse(localStorage.getItem("isLightTheme")) ?? true,
    },
    reducers: {
        changeThemeMode: (state) => {
            state.isLightTheme = !state.isLightTheme;
            localStorage.setItem("isLightTheme", state.isLightTheme);
        },
    },
});

export const { changeThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
export const selectIsLightTheme = (state) => state.theme.isLightTheme;