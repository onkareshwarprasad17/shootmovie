import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header renders', () => {
  test('loads the logo text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/ShootMovie/i)).toBeInTheDocument();
  });

  test('navigates to homepage when logo is clicked', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByRole('link');
    expect(logo).toHaveClass('brand-logo');
    expect(logo).toHaveTextContent('SHOOTMovie');

    await fireEvent.click(logo);

    expect(window.location.pathname).toBe('/');
  });
});
