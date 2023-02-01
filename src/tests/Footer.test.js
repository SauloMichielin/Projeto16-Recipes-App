import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const email = screen.getByRole('textbox', { name: /email:/i });
  const password = screen.getByLabelText(/password:/i);
  const button = screen.getByRole('button', { name: /enter/i });
  userEvent.type(email, 'trybe@betrybe.com');
  userEvent.type(password, '123456789');
  userEvent.click(button);
});

describe('Test the Footer', () => {
  test('Test if have the buttons', () => {
    const drinksBtn = screen.getByRole('button', { name: /bebidas/i });
    const mealsBtn = screen.getByRole('button', { name: /comidas/i });
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('Test if you can click on the Drinks button', () => {
    const drinksBtn = screen.getByRole('button', { name: /bebidas/i });
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
  });

  test('Test if you can click on the Meals button', () => {
    const mealsBtn = screen.getByRole('button', { name: /comidas/i });
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
  });
});
