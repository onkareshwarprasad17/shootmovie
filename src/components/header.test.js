/* eslint-disable prettier/prettier */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthContext, AuthProvider } from '../components/context/context';
import Header from '../components/Header';
import store from '../components/redux/store';
import { fireEvent } from '@testing-library/dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import PrivateRoutes from './PrivateRoutes';
import Home from './Home';
import { act } from 'react-dom/test-utils';

// Mocking useNavigate Hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const renderWithContext = (component) => {
  return {
    ...render(
      <MemoryRouter initialEntries={['/home']}>
        <Provider store={store}>
          <AuthProvider value={AuthContext}>{component}</AuthProvider>
        </Provider>
      </MemoryRouter>
    ),
  };
};

describe('Header component renders', () => {
  test('logout button should not render when user is logged out', async () => {
    // By default, user is logged out at the start
    let login = jest.fn();
    let logout = jest.fn();
    let user = null;
    render(
      <Provider store={store}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Header />
        </AuthContext.Provider>
      </Provider>
    );

    let element = await screen.queryByText('Logout');
    expect(element).toBeNull();
  });
  let logoutButton;
  test('logout button should render when user is logged in', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const header = renderWithContext(
      <>
        <Header />
        <Login />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
        </Routes>
      </>
    );
    let usernameInput = header.getByPlaceholderText('Username');
    let passwordInput = header.getByPlaceholderText('Password');
    const loginButton = header.getByRole('button', { name: 'Login' });

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'mor_2314' } });
      fireEvent.change(passwordInput, { target: { value: '83r5^_' } });
      fireEvent.click(loginButton, { button: 0 });
    });
    await waitFor(() => {
      expect(header.queryByText('Login Successful!')).toBeVisible();
    });

    expect(header.getAllByText('SHOOTMovie')[0]).toHaveClass('logo');
    act(() => {
      fireEvent.click(header.getAllByText('SHOOTMovie')[0], { button: 0 });
    });
    expect(navigate).toHaveBeenCalledWith('/home', { replace: true });

    logoutButton = await header.findByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(logoutButton, { button: 0 });
    });
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});
