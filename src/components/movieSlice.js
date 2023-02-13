import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieDetails: {},
};

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchMovieDetails",
  async (id) => {
    const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=your-api-key&language=en-US`;
    const response = await fetch(MOVIE_URL);
    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
    });
  },
});

export default movieSlice.reducer;
