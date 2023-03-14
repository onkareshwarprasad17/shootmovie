import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieDetails: {},
};

export const fetchMovieDetails = createAsyncThunk(
  'movie/fetchMovieDetails',
  async (id) => {
    const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=76753a92ec5331ee546d385fbd9eb031&language=en-US`;
    const response = await fetch(MOVIE_URL);
    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
    });
  },
});

export default movieSlice.reducer;
