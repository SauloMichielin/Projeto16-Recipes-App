import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';

describe('test Header Component', () => {
  test('test if exist a h2 in the component', () => {
    render(<Meals />);
    const h2 = screen.getByRole('heading', { name: /meals/i });
    expect(h2).toBeInTheDocument();
  });

  test('test if there is a button in the component', () => {
    render(<Meals />);
    const button = screen.getByRole('button', { name: /perfil/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });

  test('test if when clicks on the button, you are redirected to another page', () => {
    render(<Meals />);
    const button = screen.getByRole('button', { name: /perfil/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });

  test('test if there is a search bar when clicks on the button', () => {
    render(<Meals />);
    const button = screen.getByRole('button', { name: /PESQUISAR/i });
    userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    userEvent.click(button);
    expect(input).not.toBeInTheDocument();
  });
});
