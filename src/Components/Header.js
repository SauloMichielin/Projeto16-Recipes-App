import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, iconSearch }) {
  const [showElement, setShowElement] = useState(false);

  const showOrHide = () => (showElement === true
    ? setShowElement(false) : setShowElement(true));

  const history = useHistory();

  return (
    <section>
      <h2 data-testid="page-title">{title}</h2>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile icon"
        onClick={ () => history.push('/profile') }
        aria-hidden="true"
      />
      <br />
      <br />
      {
        iconSearch && (
          <div>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search icon"
              onClick={ showOrHide }
              aria-hidden="true"
            />
          </div>
        )
      }
      {
        showElement ? (
          <SearchBar />
        ) : null
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
