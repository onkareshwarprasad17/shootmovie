import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailCard from './DetailCard';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

test('renders detail card data when available', () => {
  const mockData = {
    id: 123,
    genre_ids: [1, 2],
    media_type: 'movie',
    backdrop_path: '/1.png',
    title: 'Movie 1',
    overview: "this is movie1's overview",
  };
  const url = { url: { backdrop: 'https://localhost:3000' } };

  const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'drama' },
  ];
  useSelector.mockReturnValue({
    url: { backdrop: 'https://localhost:3000' },
    genres: genres,
  });

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <DetailCard data={mockData} />
      </MemoryRouter>
    </Provider>
  );

  // Obtaining elements
  const title = container.querySelector('.title');
  const overview = container.querySelector('.overview');
  const genreTabs = container.querySelectorAll('.genre');

  // Assertions
  expect(title).toBeInTheDocument();
  expect(overview).toBeVisible();
  expect(genreTabs.length).toEqual(2);

  const containExtraClass = genreTabs.forEach((el) =>
    el.classList.contains('genre-extra')
  );

  expect(containExtraClass).toBeFalsy();
});

test('should render ellipsis at the end when genres are more than 2', () => {
  const mockData = {
    id: 123,
    genre_ids: [1, 2, 3],
    media_type: 'movie',
    backdrop_path: '/1.png',
    title: 'Movie 1',
    overview: "this is movie1's overview",
  };

  const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'drama' },
    { id: 3, name: 'fiction' },
  ];
  useSelector.mockReturnValue({
    url: { backdrop: 'https://localhost:3000' },
    genres: genres,
  });

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <DetailCard data={mockData} />
      </MemoryRouter>
    </Provider>
  );

  // Obtaining elements
  const genreTabs = container.querySelectorAll('.genre');
  const extraTab = container.querySelector('.genre-extra');

  // Assertions
  expect(genreTabs.length).toEqual(3);
  expect(genreTabs[genreTabs.length - 1]).toHaveClass('genre-extra');
  expect(genreTabs[genreTabs.length - 1]).toHaveTextContent('...');
  expect(extraTab).toBeInTheDocument();
  expect(extraTab).toHaveTextContent('...');
});

test('should render fallback image when data has no image', () => {
  const mockData = {
    id: 123,
    genre_ids: [1, 2],
    media_type: 'movie',
    backdrop_path: null,
    title: 'Movie 1',
    overview: "this is movie1's overview",
  };
  const url = { url: { backdrop: 'https://localhost:3000' } };

  const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'drama' },
  ];
  useSelector.mockReturnValue({
    url: { backdrop: 'https://localhost:3000' },
    genres: genres,
  });
  render(
    <MemoryRouter>
      <Provider store={store}>
        <DetailCard />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByAltText('fallback-image')).toBeInTheDocument();
});
