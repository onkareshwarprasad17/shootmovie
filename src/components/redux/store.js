// Redux store for our project
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../../appSlice";
import homeReducer from "../homeSlice";
import movieReducer from "../movieSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    movie: movieReducer,
    user: appReducer,
  },
});

export default store;
