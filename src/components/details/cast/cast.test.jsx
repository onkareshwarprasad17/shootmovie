import React from 'react';
import { render, screen } from '@testing-library/react';
import Cast from './Cast';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

test('cast details show correctly', () => {
  const data = [
    {
      id: 1,
      profile_path: '/1.png',
      character: 'Shazam',
      original_name: 'Morgan',
    },
  ];
  render(
    <Provider store={store}>
      <Cast data={data} />
    </Provider>
  );

  const image = screen.getByRole('img', { name: /profile-image/i });
  expect(image).toBeInTheDocument();
  expect(image.tagName).toBe('IMG'); // should write the expected in CAPITAL letters, i.e. IMG
  expect(screen.getByText('Shazam')).toBeVisible();
});

test('should render fallback image when profile image is not available', () => {
  const data = [
    {
      id: 1,
      profile_path: null,
      character: 'Shazam',
      original_name: 'Morgan',
    },
  ];
  render(
    <Provider store={store}>
      <Cast data={data} />
    </Provider>
  );

  const fallbackImage = screen.getByRole('img', { name: /cast-profile/i });
  expect(fallbackImage).toBeInTheDocument();
});
