import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import useFetch from '../../redux/hooks/useFetch';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.mock('../../redux/hooks/useFetch', () => jest.fn());

describe('Home renders', () => {
  const mockHeroCarouselData = {
    results: [
      {
        id: 1,
        backdrop_path: '/1.jpg',
        original_title: 'Movie 1',
        overview: 'movie 1 is at first card',
        vote_average: 8.5,
      },
      {
        id: 2,
        backdrop_path: '/2.jpg',
        original_title: 'Movie 2',
        overview: 'movie 2 is at second card',
        vote_average: 7.0,
      },
    ],
  };

  const mockTopRatedMoviesData = {
    results: [
      {
        id: 1,
        backdrop_path: '/1.jpg',
        original_title: 'Movie 1',
        overview: 'movie 1 is at first card',
        vote_average: 8.5,
      },
      {
        id: 2,
        backdrop_path: '/2.jpg',
        original_title: 'Movie 2',
        overview: 'movie 2 is at second card',
        vote_average: 7.0,
      },
    ],
  };

  const mockTrendingData = {
    results: [
      {
        id: 1,
        backdrop_path: '/1.jpg',
        original_title: 'Movie 1',
        overview: 'movie 1 is at first card',
        vote_average: 8.5,
        genres: [
          { id: 1, name: 'action' },
          { id: 2, name: 'drama' },
        ],
      },
      {
        id: 2,
        backdrop_path: '/2.jpg',
        original_title: 'Movie 2',
        overview: 'movie 2 is at second card',
        vote_average: 7.0,
        genres: [{ id: 1, name: 'action' }],
      },
    ],
  };

  const mockUpcomingData = {
    results: [{ backdrop_path: '1.png', id: 1, original_title: 'Movie 1' }],
  };

  test('render hero carousel correctly', () => {
    useFetch.mockImplementation((url) => {
      switch (url) {
        case '/movie/popular': {
          return {
            data: mockHeroCarouselData,
            loading: false,
          };
        }
        case '/movie/top_rated':
          return {
            data: mockTopRatedMoviesData,
            loading: false,
          };

        case '/trending/movie/week':
          return {
            data: mockTrendingData,
            loading: false,
          };
        case '/movie/upcoming':
          return {
            data: mockUpcomingData,
            loading: false,
          };
        default: {
          return {
            data: null,
            loading: false,
          };
        }
      }
    });

    const MemoizedHome = React.memo(Home);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <MemoizedHome />
        </MemoryRouter>
      </Provider>
    );
    expect(useFetch).toHaveBeenCalledWith('/movie/popular');
    expect(useFetch).toHaveBeenCalledWith('/movie/top_rated');
    expect(useFetch).toHaveBeenCalledWith('/trending/movie/week');
    expect(useFetch).toHaveBeenCalledWith('/movie/upcoming');
  });
});
