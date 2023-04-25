import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Similar from './Similar';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import useFetch from '../../../redux/hooks/useFetch';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../redux/hooks/useFetch', () => jest.fn());

describe('Similar', () => {
  const mockMovieSimilarData = {
    results: [
      {
        id: 123,
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        title: 'The Movie',
        overview: 'this is overview',
        release_date: '2023',
        genres: [{ id: 1, name: 'Action' }],
        vote_average: 9.8,
      },
    ],
  };

  const mockTvSimilarData = {
    results: [
      {
        id: 123,
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        title: 'The TV Show',
        overview: 'this is overview',
        release_date: '2023',
        genres: [{ id: 1, name: 'Drame' }],
        vote_average: 8.6,
      },
    ],
  };

  const mockMultipleTvSimilarData = {
    results: [
      {
        id: 1,
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        title: 'The Tv Show',
        overview: 'this is overview',
        release_date: '2023',
        genres: [{ id: 1, name: 'Action' }],
        vote_average: 9.8,
      },
      {
        id: 2,
        media_type: 'tv',
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        title: 'The TV Show - Part-2',
        overview: 'this is overview',
        release_date: '2023',
        genres: [{ id: 2, name: 'Drama' }],
        vote_average: 7.5,
      },
    ],
  };
  beforeEach(() => {
    useFetch.mockImplementation((url) => {
      switch (url) {
        case '/movie/123/similar':
          return {
            data: mockMovieSimilarData,
            loading: false,
          };

        case '/tv/123/similar':
          return {
            data: mockTvSimilarData,
            loading: false,
          };
        case '/tv/124/similar':
          return {
            data: mockMultipleTvSimilarData,
            loading: false,
          };

        default: {
          return {
            data: null,
            loading: true,
          };
        }
      }
    });
  });

  test('calls the fetch correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/123']}>
          <Similar mediaType={'movie'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(useFetch).toHaveBeenCalledTimes(1);
      expect(useFetch).toHaveBeenCalledWith('/movie/123/similar');
    });
  });

  test('renders single movie data properly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/123']}>
          <Similar mediaType={'movie'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Similar Movie');
    expect(screen.getByRole('heading')).not.toHaveTextContent('Similar Movies');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'src',
      expect.stringContaining('/backdrop.jpg')
    );
  });

  test('renders tv show title correctly when 1 show details are present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tv/123']}>
          <Similar mediaType={'tv'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/similar tv show/i);
  });

  test('render multiple similar data and changes title accordingly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tv/124']}>
          <Similar mediaType={'tv'} id={124} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(useFetch).toHaveBeenCalledWith('/tv/124/similar');
    });

    expect(screen.getByRole('heading')).toHaveTextContent(/similar tv shows/i);
  });
});
