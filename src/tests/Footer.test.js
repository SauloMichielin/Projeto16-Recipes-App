import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';

describe('Test the Footer', () => {
  test('Test if have the buttons', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    render(<Meals />);
    const drinksBtn = screen.getByRole('button', { name: /bebidas/i });
    const mealsBtn = screen.getByRole('button', { name: /comidas/i });
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('Test if you can click on the Drinks button', () => {
    render(<Meals />);
    const drinksBtn = screen.getByRole('button', { name: /bebidas/i });
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
  });

  test('Test if you can click on the Meals button', () => {
    render(<Meals />);
    const mealsBtn = screen.getByRole('button', { name: /comidas/i });
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
  });
});
