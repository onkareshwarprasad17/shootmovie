import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { getImageUrl, getGenres } from './redux/appSlice';
import { fetchFromApi } from './utils/api';
import App from './App';
import store from './redux/store';

const dispatchSpy = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('./utils/api');

describe('App component renders', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchSpy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches image configuration and genres on mount', async () => {
    const imageConfig = {
      images: {
        secure_base_url: 'http://image.tmdb.org/t/p/',
      },
    };

    const mockUrls = {
      backdrop: imageConfig.images.secure_base_url + 'original',
      poster: imageConfig.images.secure_base_url + 'original',
      profile: imageConfig.images.secure_base_url + 'original',
    };

    const genresMovieResponse = {
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' },
      ],
    };

    const genresTVShowResponse = {
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' },
      ],
    };

    const allGenres = [];
    const data = [genresMovieResponse, genresTVShowResponse];
    data?.map((genreList) =>
      genreList?.genres.map(
        (genre) =>
          !allGenres.some((g) => g?.id === genre?.id) && allGenres.push(genre)
      )
    );

    fetchFromApi.mockReturnValueOnce(imageConfig);
    fetchFromApi.mockReturnValueOnce(genresMovieResponse);
    fetchFromApi.mockReturnValueOnce(genresTVShowResponse);

    render(<App />);

    await waitFor(() => {
      expect(fetchFromApi).toHaveBeenCalledTimes(3);
    });
    expect(fetchFromApi).toHaveBeenCalledWith('/configuration');
    expect(fetchFromApi).toHaveBeenCalledWith('/genre/tv/list');
    expect(fetchFromApi).toHaveBeenCalledWith('/genre/movie/list');
    expect(dispatchSpy).toHaveBeenCalledWith(getImageUrl(mockUrls));
    expect(dispatchSpy).toHaveBeenCalledWith(getGenres(allGenres));
  });

  test('renders header and footer', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      // ARIA role for header is banner
      expect(screen.getByRole('banner')).toBeInTheDocument();
      // ARIA role for header is contentinfo
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/onkareshwar/i);
  });
});
