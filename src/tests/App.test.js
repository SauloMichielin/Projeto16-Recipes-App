import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
  const linkElement = screen.getByRole('heading', { name: /trybe/i });
  expect(linkElement).toBeInTheDocument();
});