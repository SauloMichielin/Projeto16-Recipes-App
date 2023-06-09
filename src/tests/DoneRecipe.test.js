import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import doneRecipes from '../mockTemp';

beforeEach(async () => {
  render(<MemoryRouter><ContextProvider><App /></ContextProvider></MemoryRouter>);
  const email = screen.getByRole('textbox', { name: /email:/i });
  const password = screen.getByLabelText(/password:/i);
  const button = screen.getByRole('button', { name: /enter/i });
  localStorage.setItem('doneRecipes', doneRecipes);
  userEvent.type(email, 'trybe@betrybe.com');
  userEvent.type(password, '123456789');
  userEvent.click(button);
  const profileBtn = screen.findByTestId('profile-top-btn');
  userEvent.click(await profileBtn);
  const doneBtn = screen.findByRole('button', { name: /done recipes/i });
  userEvent.click(await doneBtn);
});

afterEach(() => {
  localStorage.clear();
});

// commit

describe('test if have all the buttons in the screen in the Done Recipes component', () => {
  test('', () => {
    const title = screen.getByRole('heading', { name: /done recipes/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const drinkBtn = screen.getByRole('button', { name: /drinks/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(title).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  });
});

describe('', () => {
  test('', async () => {
    const img = screen.findByTestId('0-horizontal-image');
    expect(await img).toBeInTheDocument();
  });
});
