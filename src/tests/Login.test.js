import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import Login from '../pages/Login';

describe('test Login Page', () => {
  test('test if have the email input', () => {
    render(<Login />);
    const email = screen.getByRole('textbox', { name: /email:/i });
    expect(email).toBeInTheDocument();
  });
  test('test if have the password input', () => {
    render(<Login />);
    const password = screen.getByLabelText(/password:/i);
    expect(password).toBeInTheDocument();
  });
  test('test if have the button', () => {
    render(<Login />);
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();
  });
  test('test if the button is disabled and turn enabled after put the email and password', () => {
    render(<Login />);
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const password = screen.getByLabelText(/password:/i);
    expect(password).toBeInTheDocument();
    const email = screen.getByRole('textbox', { name: /email:/i });
    expect(email).toBeInTheDocument();

    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
  });
});