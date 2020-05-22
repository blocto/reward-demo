import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Blocto address', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Blocto address/i);
  expect(linkElement).toBeInTheDocument();
});
