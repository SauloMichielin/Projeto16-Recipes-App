import React from 'react';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input data-testid="email-input" type="email" id="email" />
      </label>
      <label htmlFor="password">
        Password:
        <input data-testid="password-input" type="password" id="password" />
      </label>
      <button data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

// commmit maneiro
