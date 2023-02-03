import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';

beforeEach(() => {
  render(<MemoryRouter><ContextProvider><App /></ContextProvider></MemoryRouter>);
  const email = screen.getByRole('textbox', { name: /email:/i });
  const password = screen.getByLabelText(/password:/i);
  const button = screen.getByRole('button', { name: /enter/i });
  userEvent.type(email, 'trybe@betrybe.com');
  userEvent.type(password, '123456789');
  userEvent.click(button);
});

afterEach(() => {
  jest.clearAllMocks();
});

const testId = 'search-top-btn';
// ------------------------------------------------------------------------------------

describe('', () => {
  test('test if exist a h2 in the component', () => {
    const h2 = screen.getByRole('heading', { name: /meals/i });
    expect(h2).toBeInTheDocument();
  });
  test('test if there is a button in the component', () => {
    const perfilButton = screen.getByTestId('profile-top-btn');
    expect(perfilButton).toBeInTheDocument();
    userEvent.click(perfilButton);
    const perfil = screen.getByRole('heading', { name: /profile/i });
    expect(perfil).toBeInTheDocument();
  });
  test('test if there is a search bar when clicks on the button', () => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    userEvent.click(button);
    expect(input).not.toBeInTheDocument();
  });
  test('test search bar in header', () => {
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
  test('Search bar inputs', () => {
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

  test('Test the firstLetter in the Meals component', () => {
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

describe('Test the alerts from the searchBar in the Meals component', () => {
  beforeEach(() => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
  });
  test('Test if throw a alert in the ingredients radio button', async () => {
    global.alert = jest.fn();
    const input = screen.findByRole('textbox');
    const ingrediente = screen.findByText(/ingrediente/i);
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'xablau');
    userEvent.click(await ingrediente);
    userEvent.click(await buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('Test if throw a alert in the name radio button', async () => {
    global.alert = jest.fn();
    const input = screen.findByRole('textbox');
    const nome = screen.findByText(/nome/i);
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'xablau');
    userEvent.click(await nome);
    userEvent.click(await buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('Test if throw a alert in the Meals component', async () => {
    global.alert = jest.fn();
    const letra = screen.findByText(/primeira letra/i);
    const input = screen.findByRole('textbox');
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'aa');
    userEvent.click(await letra);
    userEvent.click(await buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
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
  test('Search bar inputs', async () => {
    const button = screen.getByTestId(testId);
    userEvent.click(button);
    const letra = screen.findByText(/primeira letra/i);
    const input = screen.findByRole('textbox');
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'a');
    userEvent.click(await letra);
    userEvent.click(await buscarBtn);
  });

  test('Test the ingredients radio button', async () => {
    const input = screen.findByRole('textbox');
    const ingrediente = screen.findByText(/ingrediente/i);
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'vodka');
    userEvent.click(await ingrediente);
    userEvent.click(await buscarBtn);
  });

  test('Test the name radio button', async () => {
    const input = screen.findByRole('textbox');
    const nome = screen.findByText(/nome/i);
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'vodka');
    userEvent.click(await nome);
    userEvent.click(await buscarBtn);
  });
});

describe('Test the alerts in the Drink component', () => {
  beforeEach(() => {
    const drinksBtn = screen.getByRole('button', { name: /bebidas/i });
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
    const button = screen.getByTestId(testId);
    userEvent.click(button);
  });
  test('Test if throw a alert in the Drinks component', async () => {
    global.alert = jest.fn();
    const letra = screen.findByText(/primeira letra/i);
    const input = screen.findByRole('textbox');
    const buscarBtn = screen.findByRole('button', { name: /buscar/i });
    userEvent.type(await input, 'aa');
    userEvent.click(await letra);
    userEvent.click(await buscarBtn);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
