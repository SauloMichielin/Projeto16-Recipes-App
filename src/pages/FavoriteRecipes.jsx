import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import doneRecipes from '../mockTemp';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const [localS, setLocalS] = useState([]);
  const listFav = [];

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const lS = JSON.parse(localStorage.getItem('doneRecipes'));
    setLocalS(lS);
  }, []);

  if (filter === 'All') {
    localS.filter((tag) => listFav.push(tag));
    console.log('Botão All acionado');
  } else if (filter === 'Meals') {
    localS.filter((tag) => tag.type === 'meal' && listFav.push(tag));
    console.log('Botão Meals acionado');
  } else if (filter === 'Drinks') {
    localS.filter((tag) => tag.type === 'drink' && listFav.push(tag));
    console.log('Botão Drinks acionado');
  }

  return (
    <section>
      <Header title="Favorite Recipes" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('All') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter('Meals') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('Drinks') }
        >
          Drinks
        </button>
        { listFav.map((tag, i) => (tag.type === 'meal'
          ? (
            <div key={ i }>
              <h2 data-testid={ `${i}-horizontal-name` }>
                { tag.name }
              </h2>
              <img
                data-testid={ `${i}-horizontal-image` }
                src={ tag.image }
                alt={ tag.name }
              />
              <h4 data-testid={ `${i}-horizontal-top-text` }>
                {`${tag.nationality} - ${tag.category}`}
              </h4>
              <img
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                alt="Share button"
              />
              <img
                type="button"
                data-testid={ `${i}-horizontal-favorite-btn` }
                src="src/images/blackHeartIcon.svg"
                alt="Favorite Button"
              />
            </div>
          ) : (
            <div key={ i }>
              <h2 data-testid={ `${i}-horizontal-name` }>
                { tag.name }
              </h2>
              <img
                data-testid={ `${i}-horizontal-image` }
                src={ tag.image }
                alt={ tag.name }
              />
              <h4 data-testid={ `${i}-horizontal-top-text` }>
                {`${tag.nationality} - ${tag.category}`}
              </h4>
              <h4 data-testid={ `${i}-horizontal-top-text` }>
                { tag.alcoholicOrNot }
              </h4>
              <img
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                alt="Share button"
              />
              <img
                type="button"
                data-testid={ `${i}-horizontal-favorite-btn` }
                src="src/images/blackHeartIcon.svg"
                alt="Favorite Button"
              />
            </div>
          ))) }
      </div>
    </section>
  );
}

export default FavoriteRecipes;
