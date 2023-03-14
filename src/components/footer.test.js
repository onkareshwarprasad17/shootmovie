import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('footer renders correctly', () => {
  render(<Footer />);
  let footerText = screen.getByRole('contentinfo');
  expect(footerText).toHaveTextContent('Onkareshwar');
});
