import React from 'react';

function SearchBar() {
  return (
    <label htmlFor="search">
      <form name="search">
        <label htmlFor="searchInput">
          <input
            id="search-input"
            data-testid="search-input"
            type="text"
          />
        </label>
        <div className="search-radio-buttons">

          <label htmlFor="ingredients">
            <input
              type="radio"
              value="ingredients"
              id="ingredients"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>

          <label htmlFor="name">
            <input
              type="radio"
              value="name"
              id="name"
              data-testid="name-search-radio"
            />
            Nome
          </label>

          <label htmlFor="firstLetter">
            <input
              type="radio"
              value="firstLetter"
              id="firstLetter"
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>

          <button
            type="button"
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </form>
    </label>
  );
}

export default SearchBar;
