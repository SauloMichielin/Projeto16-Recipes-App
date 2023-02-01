import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<MemoryRouter><ContextProvider><App /></ContextProvider></MemoryRouter>);
  const linkElement = screen.getByRole('heading', { name: /trybe/i });
  expect(linkElement).toBeInTheDocument();
});
