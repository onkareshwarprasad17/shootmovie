/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthContext, AuthProvider } from './components/context/context';
import store from './components/redux/store';

describe('App', () => {
  test('renders header', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toHaveClass('header-container');
  });

  test('renders footer', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      /created by onkareshwar/i
    );
  });

  test('renders login page on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    );

    let loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });

  test('renders home page on "/home" route if user is authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    );
    let usernameInput = screen.getByPlaceholderText('Username');
    let passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'mor_2314' } });
    fireEvent.change(passwordInput, { target: { value: '83r5^_' } });
    fireEvent.click(loginButton);

    waitFor(() => {
      expect(screen.findByText('Login Successful!')).toBeVisible();
      expect(screen.location.pathname).toEqual('/home');
    });
  });

  test('renders login page on "/home" route if user is unauthenticated', async () => {
    let user = null;
    let login = jest.fn();
    let logout = jest.fn();
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Provider store={store}>
          <AuthContext.Provider value={{ user, login, logout }}>
            <App />
          </AuthContext.Provider>
        </Provider>
      </MemoryRouter>
    );
    console.log(window.location.pathname);
    let usernameInput = screen.getByPlaceholderText('Username');
    let passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'mor_2' } });
    fireEvent.change(passwordInput, { target: { value: '83' } });
    fireEvent.click(loginButton);

    waitFor(() => {
      expect(screen.findByText('Login Successful!')).not.toBeVisible();
      expect(screen.location.pathname).toEqual('/login');
    });
  });

  test('renders movie page on "/movie/1077280" route if user is authenticated', async () => {
    let user = { token: 'sample-token' };
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

    const moviePage = render(
      <MemoryRouter initialEntries={['/movie/1077280']}>
        <Provider store={store}>
          <AuthContext.Provider value={{ user }}>
            <App />
          </AuthContext.Provider>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(moviePage.getByText('Die Hart')).toBeInTheDocument();
    });

    global.fetch.mockClear();
    delete global.fetch;
  });
});
