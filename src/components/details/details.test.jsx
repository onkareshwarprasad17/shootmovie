import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Details from './Details';
import useFetch from '../../redux/hooks/useFetch';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import DetailsBanner from './detailsBanner/DetailsBanner';

jest.mock('../../redux/hooks/useFetch', () => jest.fn());

describe('Details page renders properly', () => {
  const mockData = {
    id: 123,
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    original_title: 'The Movie',
    overview: 'this is overview',
    release_date: '2023-02-14',
    genres: [{ id: 1, name: 'Action' }],
    vote_average: 9.8,
  };

  const mockCastData = {
    cast: [
      {
        profile_path: '/profile.jpg',
        original_name: 'Actor 1',
        character: 'Character 1',
      },
    ],
  };

  const mockSimilarData = {
    data: {
      results: [
        {
          media_type: 'movie',
          ...mockData,
        },
      ],
    },
  };

  const mockRecommendedData = {
    data: {
      results: [
        {
          media_type: 'movie',
          ...mockData,
        },
      ],
    },
  };

  const mockTrailerData = {
    data: {
      results: [
        {
          key: 'key123',
          id: '123',
          name: 'trailer',
        },
      ],
    },
  };

  beforeEach(() => {
    useFetch.mockReturnValue({
      data: mockData,
      loading: false,
    });
    useFetch.mockReturnValue({
      data: mockCastData,
      loading: false,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('it should render sections when data is fetched', async () => {
    useFetch.mockReturnValueOnce({
      data: mockData,
      loading: false,
    });

    useFetch.mockReturnValueOnce({
      data: mockCastData,
      loading: false,
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/123']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('details-banner')).toBeInTheDocument();

    const showMoreButton = container.querySelector('.show-more');

    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    await fireEvent.click(showMoreButton);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });
});
