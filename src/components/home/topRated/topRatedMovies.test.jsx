import React from 'react';
import { render, screen } from '@testing-library/react';
import TopRatedMovies from './TopRatedMovies';
import useFetch from '../../../redux/hooks/useFetch';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

jest.mock('../../../redux/hooks/useFetch', () => jest.fn());

describe('Top Rated Movies renders', () => {
  test('renders movies when results is present in data', () => {
    useFetch.mockReturnValue({
      data: {
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
      },
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <TopRatedMovies />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Top Rated Movies/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/sectionCarousel-card/i)).toHaveLength(2);
    expect(screen.getByText('movie 1 is at first card')).toBeInTheDocument();
  });

  test('does not renders movies when there is no results present in data', () => {
    useFetch.mockReturnValue({
      data: {},
    });
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <TopRatedMovies />
        </Provider>
      </MemoryRouter>
    );
    expect(queryByTestId('sectionCarousel-card')).not.toBeInTheDocument();
  });
});
