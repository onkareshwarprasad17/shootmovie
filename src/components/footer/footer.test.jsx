import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer renders', () => {
  test('copyright text renders', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footerText = screen.getByText(/created with/i);
    expect(footerText).toBeInTheDocument();
  });
});
