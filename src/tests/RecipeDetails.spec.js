import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ContextProvider from '../Context/ContextProvider';
// import Meals from '../pages/Meals';
// import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';
import { meals } from '../../cypress/mocks/meals';

describe('Testes da Tela de Detalhes de uma Receita', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    await act(() => render(
      <MemoryRouter>
        <ContextProvider>
          <App />
        </ContextProvider>
      </MemoryRouter>,
    ));
    const email = screen.getByRole('textbox', { name: /email:/i });
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: /enter/i });
    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '123456789');
    userEvent.click(button);
  });

  test('verifica se RecipeDetails renderiza implementações', async () => {
    const btnMeal = await screen.findByTestId('0-card-img');
    expect(btnMeal).toBeInTheDocument();
    userEvent.click(btnMeal);
    const titlePage = await screen.findByText(/recipedetails/i);
    expect(titlePage).toBeInTheDocument();
    const imgRecipe = await screen.findByTestId('recipe-photo');
    expect(imgRecipe).toBeInTheDocument();
    const btnStart = await screen.findByRole('button', { name: /Stat Recipe/ });
    expect(btnStart).toBeInTheDocument();
  });
});
