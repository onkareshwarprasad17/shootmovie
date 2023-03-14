/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../components/context/context';
import store from '../components/redux/store';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { message } from 'antd';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Login on invalid credentials', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.reject({ message: 'username or password is incorrect' }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
    delete global.fetch;
  });

  test('renders correctly', async () => {
    const loginPage = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(loginPage.getByRole('heading', { level: 3 })).toHaveTextContent(
      /welcome to/i
    );
  });

  test('throw error on empty field submission', async () => {
    const loginPage = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </MemoryRouter>
    );
    const loginButton = loginPage.getByRole('button', { name: 'Login' });
    act(() => {
      fireEvent.click(loginButton);
    });
    await waitFor(() => {
      expect(loginPage.getByText('Username is required!')).toBeInTheDocument();
      expect(loginPage.getByText('Password is required!')).toBeInTheDocument();
    });
  });

  test('throw error when user credentials are wrong', async () => {
    const loginPage = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </MemoryRouter>
    );

    let usernameField = screen.getByPlaceholderText('Username');
    let passwordField = screen.getByPlaceholderText('Password');
    const loginButton = loginPage.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameField, { target: { value: 'sample' } });
    fireEvent.change(passwordField, { target: { value: 'sample#1213' } });
    await act(async () => fireEvent.click(loginButton));
    expect(message.error).toHaveBeenCalledWith('Invalid username or password!');
  });
});

describe('Login on correct credentials', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: 'enfo38uf93j4982en2c80',
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
    delete global.fetch;
  });

  test('success message should show on correct credentials submission', async () => {
    let user = null;
    let login = jest.fn();
    let logout = jest.fn();
    const loginPage = render(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>
          <AuthContext.Provider value={{ user, login, logout }}>
            <App />
          </AuthContext.Provider>
        </Provider>
      </MemoryRouter>
    );

    let usernameInput = screen.getByPlaceholderText('Username');
    let passwordInput = screen.getByPlaceholderText('Password');
    let loginButton = loginPage.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'mor_2314' } });
    fireEvent.change(passwordInput, { target: { value: '83r5^_' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith('Login Successful!');
      expect(login).toHaveBeenCalledWith('enfo38uf93j4982en2c80');
    });
  });
});
