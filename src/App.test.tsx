import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders pictophone header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Pictophone/i);
  expect(headerElement).toBeInTheDocument();
});
