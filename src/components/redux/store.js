// Redux store for our project
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../homeSlice';
import movieReducer from '../movieSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    movie: movieReducer,
  },
});

export default store;
