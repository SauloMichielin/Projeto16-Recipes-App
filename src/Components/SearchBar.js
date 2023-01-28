import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchDrinks from '../Hooks/useFetchDrinks';
import useFetchMeals from '../Hooks/useFetchMeals';

function SearchBar() {
  const { makeMealsFetch } = useFetchMeals();
  const { makeDrinksFetch } = useFetchDrinks();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [radioSelect, setRadioSelect] = useState('');
  // pushzão da massa para passar requisito
  const handleClick = () => {
    if (history.location.pathname === '/meals') {
      if (radioSelect === 'firstLetter' && inputValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (radioSelect === 'ingredients') {
        makeMealsFetch('filter.php?i=', inputValue);
      } else if (radioSelect === 'name') {
        makeMealsFetch('search.php?s=', inputValue);
      } else {
        makeMealsFetch('search.php?f=', inputValue);
      }
    }
    if (radioSelect === 'firstLetter' && inputValue.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (radioSelect === 'ingredients') {
      makeDrinksFetch('filter.php?i=', inputValue);
    } else if (radioSelect === 'name') {
      makeDrinksFetch('search.php?s=', inputValue);
    } else {
      makeDrinksFetch('search.php?f=', inputValue);
    }
  };
  return (
    <label htmlFor="search">
      <form name="search">
        <label htmlFor="searchInput">
          <input
            id="search-input"
            data-testid="search-input"
            type="text"
            name="searchInput"
            onChange={ (e) => setInputValue(e.target.value) }
          />
        </label>
        <div className="search-radio-buttons">

          <label htmlFor="ingredients">
            <input
              type="radio"
              value="ingredients"
              id="ingredients"
              name="radioButtons"
              onClick={ (e) => setRadioSelect(e.target.value) }
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>

          <label htmlFor="name">
            <input
              type="radio"
              value="name"
              id="name"
              name="radioButtons"
              onClick={ (e) => setRadioSelect(e.target.value) }
              data-testid="name-search-radio"
            />
            Nome
          </label>

          <label htmlFor="firstLetter">
            <input
              type="radio"
              value="firstLetter"
              id="firstLetter"
              name="radioButtons"
              onClick={ (e) => setRadioSelect(e.target.value) }
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>

          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Buscar
          </button>
        </div>
      </form>
    </label>
  );
}

export default SearchBar;
