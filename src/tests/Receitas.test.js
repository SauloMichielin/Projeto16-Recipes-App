import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = screen.getByRole('heading', { name: /trybe/i });
  expect(linkElement).toBeInTheDocument();
});
