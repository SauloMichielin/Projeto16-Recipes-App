import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';

describe('Testes da página de profile', () => {
  beforeEach(() => {
    render(<MemoryRouter><ContextProvider><App /></ContextProvider></MemoryRouter>);
    const email = screen.getByRole('textbox', { name: /email:/i });
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: /enter/i });
    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '123456789');
    userEvent.click(button);
    const ProfileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(ProfileIcon);
    const goToFav = screen.getByTestId('profile-favorite-btn');
    userEvent.click(goToFav);
  });

  test('Check if the recipes is on the screen', () => {
    const getRecipe = screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    expect(getRecipe).toBeInTheDocument();
  });

  test('Check if the buttons are on the screen', () => {
    const getbtn = screen.getByTestId('filter-by-all-btn');
    expect(getbtn).toBeInTheDocument();

    const getbtnM = screen.getByTestId('filter-by-meal-btn');
    expect(getbtnM).toBeInTheDocument();

    const getbtnD = screen.getByTestId('filter-by-meal-btn');
    expect(getbtnD).toBeInTheDocument();
  });
});
