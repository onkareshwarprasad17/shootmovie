/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { AuthContext } from './context/context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Home', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 1077280,
                title: 'Die Hart',
                overview:
                  'Kevin Hart - playing a version of himself - is on a death-defying quest to become an action star. And with a little help from John Travolta',
              },
              {
                id: 1077280,
                title: 'Die Hart',
                overview:
                  'Kevin Hart - playing a version of himself - is on a death-defying quest to become an action star',
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  test('renders jsx', async () => {
    const user = {
      token: 'sample-token',
    };

    let home = render(
      <MemoryRouter initialEntries={['/home']}>
        <AuthContext.Provider value={{ user }}>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(home.getAllByTestId('column')).toHaveLength(2);
      const description = home.getAllByText(/action star/);
      expect(description[0]).toBeInTheDocument();
      expect(description[0]).toHaveClass('movieCard-description');
      expect(description[0].closest('p').textContent.length).toBeGreaterThan(
        100
      );
      expect(
        description[1].closest('p').textContent.length
      ).not.toBeGreaterThan(100);
    });
  });
});
