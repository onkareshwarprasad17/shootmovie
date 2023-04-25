const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  url: {},
  genres: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getImageUrl: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getImageUrl, getGenres } = appSlice.actions;
export default appSlice.reducer;
