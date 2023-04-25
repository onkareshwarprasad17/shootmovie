import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import Explore from './Explore';
import store from '../../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

test('explore sections renders correctly', () => {
  const genres = [{ id: 1, name: 'action' }];
  useSelector.mockReturnValueOnce({
    genres,
  });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <Explore />
      </Provider>
    </MemoryRouter>
  );
  const exploreSectionHeading = screen.getByText(/Explore by genres/i);
  const genreCardText = screen.getByText(/action/i);
  const genreCard = screen.getAllByTestId('genre-card');

  expect(genreCard.length).toBe(1);
  expect(exploreSectionHeading).toBeInTheDocument();
  expect(genreCardText).toBeVisible();
});
