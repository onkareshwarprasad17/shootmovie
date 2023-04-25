import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Trending from './Trending';
import useFetch from '../../../redux/hooks/useFetch';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../redux/store';

jest.mock('../../../redux/hooks/useFetch', () => jest.fn());

describe('Trending section renders correctly', () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      data: {
        results: [{ id: 1, title: 'Movie 1', backdrop_path: '/1.png' }],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Trending />
        </MemoryRouter>
      </Provider>
    );
  });

  test('cards renders correctly', () => {
    expect(screen.getByRole('link')).toHaveClass('sectionCarousel-card');
  });

  test('tab changes correctly and renders relevant data', async () => {
    const tvTab = screen.getByText(/tv shows/i);
    const movieTab = screen.getByText(/movies/i);

    expect(movieTab).toBeInTheDocument();
    expect(tvTab).toBeInTheDocument();
    expect(movieTab).toHaveClass('active');
    expect(tvTab).not.toHaveClass('active');

    await fireEvent.click(tvTab);
    expect(movieTab).not.toHaveClass('active');
    expect(tvTab).toHaveClass('active');

    await fireEvent.click(movieTab);
    expect(movieTab).toHaveClass('active');
    expect(tvTab).not.toHaveClass('active');
  });
});
