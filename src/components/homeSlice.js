import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=76753a92ec5331ee546d385fbd9eb031`;

const initialState = {
  movies: {},
};

export const fetchMovies = createAsyncThunk('movie/fetchMovies', async () => {
  let response = await fetch(API_URL);
  let data = await response.json();
  return data;
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export default homeSlice.reducer;
