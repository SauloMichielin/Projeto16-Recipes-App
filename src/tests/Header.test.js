import React from 'react';
import { screen, render } from '@testing-library/react';
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

const testId = 'search-top-btn';
// ------------------------------------------------------------------------------------

describe('test if exist a h2 in the component', () => {
  test('', () => {
    const h2 = screen.getByRole('heading', { name: /meals/i });
    expect(h2).toBeInTheDocument();
  });
});

describe('test if there is a button in the component', () => {
  test('', () => {
    const perfilButton = screen.getByTestId('profile-top-btn');
    expect(perfilButton).toBeInTheDocument();
    userEvent.click(perfilButton);
    const perfil = screen.getByRole('heading', { name: /profile/i });
    expect(perfil).toBeInTheDocument();
  });
});

describe('test if there is a search bar when clicks on the button', () => {
  test('', () => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    userEvent.click(button);
    expect(input).not.toBeInTheDocument();
  });
});

describe('test search bar in header', () => {
  test('', () => {
    const button = screen.getByTestId('search-top-btn');
    userEvent.click(button);
    const ingrediente = screen.getByText(/ingrediente/i);
    const nome = screen.getByText(/nome/i);
    const letra = screen.getByText(/primeira letra/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    expect(ingrediente).toBeInTheDocument();
    expect(nome).toBeInTheDocument();
    expect(letra).toBeInTheDocument();
    expect(buscarBtn).toBeInTheDocument();
    userEvent.click(button);
    expect(ingrediente).not.toBeInTheDocument();
    expect(nome).not.toBeInTheDocument();
    expect(letra).not.toBeInTheDocument();
    expect(buscarBtn).not.toBeInTheDocument();
  });
});

describe('Search bar inputs', () => {
  test('', () => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const letra = screen.getByText(/primeira letra/i);
    const input = screen.getByRole('textbox');
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'a');
    userEvent.click(letra);
    userEvent.click(buscarBtn);
  });
});

describe('Test the searchBar in the Meals component', () => {
  test('Test the alert', () => {
    global.alert = jest.fn();
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const letra = screen.getByText(/primeira letra/i);
    const input = screen.getByRole('textbox');
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'aa');
    userEvent.click(letra);
    userEvent.click(buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('Test the ingredients radio button', () => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const input = screen.getByRole('textbox');
    const ingrediente = screen.getByText(/ingrediente/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'Chicken');
    userEvent.click(ingrediente);
    userEvent.click(buscarBtn);
  });

  test('Test the name radio button', () => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const input = screen.getByRole('textbox');
    const nome = screen.getByText(/nome/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'Chicken');
    userEvent.click(nome);
    userEvent.click(buscarBtn);
  });
});

describe('Test the searchBar in the Drinks component', () => {
  beforeEach(() => {
    const drinksBtn = screen.getByRole('button', { name: /bebidas/i });
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
    const button = screen.getByTestId(testId);
    userEvent.click(button);
  });
  test('Test the alert', () => {
    global.alert = jest.fn();
    const input = screen.getByRole('textbox');
    const letra = screen.getByText(/primeira letra/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'aa');
    userEvent.click(letra);
    userEvent.click(buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('Test the ingredients radio button', () => {
    const input = screen.getByRole('textbox');
    const ingrediente = screen.getByText(/ingrediente/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'Chicken');
    userEvent.click(ingrediente);
    userEvent.click(buscarBtn);
  });

  test('Test the name radio button', () => {
    const input = screen.getByRole('textbox');
    const nome = screen.getByText(/nome/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'Chicken');
    userEvent.click(nome);
    userEvent.click(buscarBtn);
  });
});

// não sei o porque não funciona :)

describe('testa meals', () => {
  beforeEach(() => {
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    const button = screen.getByTestId(testId);
    userEvent.click(button);
  });

  test('testa a primeira letra', () => {
    const input = screen.getByRole('textbox');
    const letra = screen.getByText(/primeira letra/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, 'a');
    userEvent.click(letra);
    userEvent.click(buscarBtn);
  });

  test('testa ingredientes', () => {
    global.alert = jest.fn();
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'XABLAU');
    const ingrediente = screen.getByText(/ingrediente/i);
    userEvent.click(ingrediente);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('testa nomes', () => {
    global.alert = jest.fn();
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'XABLAU');
    const nome = screen.getByText(/nome/i);
    userEvent.click(nome);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('testa se primeira letra da erro', () => {
    global.alert = jest.fn();
    const input = screen.getByRole('textbox');
    const letra = screen.getByText(/primeira letra/i);
    const buscarBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.type(input, '0');
    userEvent.click(letra);
    userEvent.click(buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
