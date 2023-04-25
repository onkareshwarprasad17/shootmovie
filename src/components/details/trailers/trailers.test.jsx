import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import useFetch from '../../../redux/hooks/useFetch';
import Trailers from './Trailers';

jest.mock('../../../redux/hooks/useFetch', () => jest.fn());

describe('Recommended section', () => {
  const mockTrailersData = {
    results: [
      {
        id: 123,
        key: 'd4d4d4',
        name: 'trailer-1',
      },
    ],
  };

  beforeEach(() => {
    useFetch.mockImplementation((url) => {
      switch (url) {
        case '/movie/123/videos':
          return {
            data: mockTrailersData,
            loading: false,
          };

        case '/tv/123/videos':
          return {
            data: mockTrailersData,
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
          <Trailers mediaType={'movie'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(useFetch).toHaveBeenCalledTimes(1);
      expect(useFetch).toHaveBeenCalledWith('/movie/123/videos');
    });
  });

  test('renders single video properly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/123']}>
          <Trailers mediaType={'movie'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'src',
      expect.stringContaining('https://img.youtube.com/vi/d4d4d4/mqdefault.jpg')
    );
  });

  test('renders trailer section title correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tv/123']}>
          <Trailers mediaType={'tv'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Official Videos');
  });

  test('when play button is clicked, video modal should open', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tv/123']}>
          <Trailers mediaType={'tv'} id={123} />
        </MemoryRouter>
      </Provider>
    );

    const videoCard = screen.getByTestId('video-card');

    expect(videoCard).toBeInTheDocument();
    await fireEvent.click(videoCard);

    const videoPopup = screen.getByTitle('trailer-1');
    const closeButton = screen.getByRole('button');

    expect(videoPopup).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    await fireEvent.click(closeButton);

    expect(videoPopup).not.toBeInTheDocument();
  });
});
