import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const history = useHistory();

  const isValid = () => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const SIX = 6;
    const emailValid = regex.test(login.email);
    const passwordValid = login.password.length >= SIX;
    if (emailValid && passwordValid) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value });
    isValid();
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input
          onChange={ handleChange }
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
          value={ login.email }
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          onChange={ handleChange }
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          value={ login.password }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        disabled={ isBtnDisabled }
        onClick={ handleClick }
        // localStorage MTO FACIL
      >
        Enter
      </button>
    </div>
  );
}
