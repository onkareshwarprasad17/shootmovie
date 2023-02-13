// Using new Redux-toolkit
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export default appSlice.reducer;
export const { userLoggedIn, userLoggedOut } = appSlice.actions;
