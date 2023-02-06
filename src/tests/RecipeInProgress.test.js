import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
// import oneMeal from '../../cypress/mocks/oneMeal';

beforeEach(() => {
  render(<MemoryRouter><ContextProvider><App /></ContextProvider></MemoryRouter>);
  // oneMeal;
});

// ------------------------------------------------------------------------------------

describe('', () => {
  test('testando a existencia dos componentes ', () => {
    const mealsUrl = '/meals/52771/in-progress';
    render(
      <MemoryRouter initialEntries={ [mealsUrl] }>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const btnCompartilhar = screen.getByRole('button', { name: /compartilhar/i });
    const btnFavoritar = screen.getByRole('button', { name: /favoritar/i });
    const type = screen.getByRole('heading', { name: /vegetarian/i });
    const instructions = screen.getByTestId('instructions');
    const btnFinalizar = screen.getByRole('button', { name: /finalizar/i });
    const ingredients = container.querySelector('#root > div > div > div');
    expect(title).toBeInTheDocument();
    expect(btnCompartilhar).toBeInTheDocument();
    expect(btnFavoritar).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(btnFinalizar).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
  });
});
