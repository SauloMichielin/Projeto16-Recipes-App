import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';

describe('Testa <Header />', () => {
  it('Testa se é renderizado um elemento <h1> na tela', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );

    const login = screen.getByTestId(btnLogin);

    const email = screen.getByTestId(inputEmail);
    const password = screen.getByTestId(inputPassword);

    userEvent.type(email, userEmail);
    userEvent.type(password, '1234567');
    userEvent.click(login);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('Testa se é renderizado um botão que mostra e esconde um input', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
  });
});
