import React from 'react';
import { render, screen } from '@testing-library/react';
import Beta from './Beta';
// Mocking useNavigate Hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Utility components renders', () => {
  test('beta tag rendered correctly', () => {
    render(<Beta />);
    let betaTag = screen.getByText('BETA');
    expect(betaTag).toBeInTheDocument();
  });
});
