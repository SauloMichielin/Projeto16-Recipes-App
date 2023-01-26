import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ title, iconSearch }) {
  const history = useHistory();
  return (
    <section>
      <h2 data-testid="page-title">{title}</h2>
      <button
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile icon"
        onClick={ () => history.push('/profile') }
      >
        PERFIL
      </button>
      <br />
      <br />
      {
        iconSearch && <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search icon"
        />
      }
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  iconSearch: PropTypes.bool,
};

Header.defaultProps = {
  iconSearch: false,
};

export default Header;
