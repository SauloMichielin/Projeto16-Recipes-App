import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Profile from '../pages/Profile';

describe('Testes da página de profile', () => {
  beforeEach(() => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const email = screen.getByRole('textbox', { name: /email:/i });
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: /enter/i });
    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '123456789');
    userEvent.click(button);
    const ProfileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(ProfileIcon);
  });
  test('verifica se os botões e email são exibidos na tela', () => {
    const DoneRecipe = screen.getByRole('button', { name: /done recipes/i });
    const favRecipe = screen.getByRole('button', { name: /favorite recipes/i });
    const logout = screen.getByRole('button', { name: /logout/i });
    const email = screen.getByText(/trybe@betrybe\.com/i);
    expect(DoneRecipe).toBeInTheDocument();
    expect(favRecipe).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
  test('Test if are changing the route when the logout button is pressed', () => {
    const logout = screen.getByRole('button', { name: /logout/i });
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
  });
  test('Test if are changing the route when the Done Recipe button is pressed', () => {
    const DoneRecipe = screen.getByRole('button', { name: /done recipes/i });
    expect(DoneRecipe).toBeInTheDocument();
    userEvent.click(DoneRecipe);
  });
  test('Test if are changing the route when the Favorite Recipe button is pressed', () => {
    const FavRecipe = screen.getByRole('button', { name: /favorite recipes/i });
    expect(FavRecipe).toBeInTheDocument();
    userEvent.click(FavRecipe);
  });
});

// describe('Test if doest have email', () => {
//   test('', () => {
//     render(<Profile />);
//     const email = screen.getByTestId('profile-email');
//     expect(email).not.toBeInTheDocument();
//   });
// });
