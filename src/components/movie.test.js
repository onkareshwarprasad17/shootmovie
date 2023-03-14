/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import store from './redux/store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthContext } from './context/context';
import App from '../App';

describe('Movie component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 1077280,
            title: 'Die Hart',
            genres: [{ id: 28, name: 'Action' }],
            production_companies: [{ name: 'HartBeat Productions' }],
          }),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  test('renders the movie title in the HTML', async () => {
    const user = { token: 'eyJhbGciOiJIUzI1NiIsInR' };

    let moviepage = render(
      <MemoryRouter initialEntries={['/movie/1077280']}>
        <AuthContext.Provider value={{ user }}>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Wait for the movie details to be fetched and rendered
    await waitFor(() => {
      expect(moviepage.getByText('Die Hart')).toBeInTheDocument();
      expect(moviepage.getByText('HartBeat Productions')).toBeInTheDocument();
    });
  });
});
