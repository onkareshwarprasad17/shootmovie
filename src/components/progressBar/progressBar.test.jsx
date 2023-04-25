import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

test('progress bar renders correctly', () => {
  const currentSlide = { id: 1, vote_average: 7.5 };
  render(<ProgressBar currentSlide={currentSlide} />);
  expect(screen.getByText(7.5)).toBeInTheDocument();
});
