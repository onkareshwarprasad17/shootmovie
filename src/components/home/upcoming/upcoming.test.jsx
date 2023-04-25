import React from 'react';
import { render, screen } from '@testing-library/react';
import Upcoming from './Upcoming';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import useFetch from '../../../redux/hooks/useFetch';

jest.mock('../../../redux/hooks/useFetch', () => jest.fn());

describe('Upcoming renders', () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      data: {
        results: [{ backdrop_path: '1.png', id: 1, original_title: 'Movie 1' }],
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Upcoming />
        </MemoryRouter>
      </Provider>
    );
  });

  test('section text renders', () => {
    expect(screen.getByText(/.+upcoming/i)).toBeInTheDocument();
  });

  test('upcoming carousel renders', () => {
    expect(screen.getByRole('link', { href: `/movie/1` })).toBeInTheDocument();
  });
});
