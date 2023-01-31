import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const history = useHistory();
  const getEmailLS = localStorage.getItem('user');
  const emailParse = JSON.parse(getEmailLS);
  const haveEmail = !getEmailLS ? getEmailLS : emailParse.email;
  return (
    <section>
      <Header title="Profile" />
      <span>Email:</span>
      {' '}
      <span data-testid="profile-email">{ haveEmail }</span>
      <br />
      <button
        type="button"
        onClick={ () => history.push('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
