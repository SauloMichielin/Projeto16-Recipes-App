import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da página de profile', () => {
  test('verifica se os botões e email são exibidos na tela', () => {
    render(<App />);
    const email = screen.getByRole('textbox', { name: /email:/i });
    expect(email).toBeInTheDocument();
    const password = screen.getByLabelText(/password:/i);
    expect(password).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();

    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '123456789');
    userEvent.click(button);

    const titulo = screen.getByRole('heading', { name: /meals/i });
    expect(titulo).toBeInTheDocument();

    const btnProfile = screen.getByRole('button', { name: /perfil/i });
    userEvent.click(btnProfile);

    const title = screen.getByRole('heading', { level: 2, name: /profile/i });
    expect(title).toBeInTheDocument();

    const emailUser = screen.getByTestId('profile-email');
    expect(emailUser).toBeInTheDocument();

    const btnDoneR = screen.getByRole('button', { name: /done recipes/i });
    expect(btnDoneR).toBeInTheDocument();
    userEvent.click(btnDoneR);

    const btnProfile1 = screen.getByRole('button', { name: /perfil/i });
    userEvent.click(btnProfile1);

    const btnFavR = screen.getByRole('button', { name: /favorite recipes/i });
    expect(btnFavR).toBeInTheDocument();
    userEvent.click(btnFavR);

    const btnProfile2 = screen.getByRole('button', { name: /perfil/i });
    userEvent.click(btnProfile2);

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
  });
});
