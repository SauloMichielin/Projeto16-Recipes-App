import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const [localS, setLocalS] = useState([]);
  const [showOrHide, setShowOrHide] = useState(0);
  const listFav = [];

  useEffect(() => {
    const lS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setLocalS(lS);
  }, []);

  if (filter === 'All') {
    localS.filter((tag) => listFav.push(tag));
  }
  if (filter === 'Meals') {
    localS.filter((tag) => tag.type === 'meal' && listFav.push(tag));
  }
  if (filter === 'Drinks') {
    localS.filter((tag) => tag.type === 'drink' && listFav.push(tag));
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
              <div
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/${tag.type}s/${tag.id}`);
                  setShowOrHide(+tag.id);
                } }
                data-testid={ `${i}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share button"
                aria-hidden
              >
                <img
                  type="button"
                  src={ shareIcon }
                  alt="Share button"
                />
                <br />
                <h4
                  style={ { display: showOrHide === +tag.id ? 'content' : 'none' } }
                >
                  Link copied!
                </h4>
              </div>
              <img
                type="button"
                data-testid={ `${i}-horizontal-favorite-btn` }
                src={ blackHeart }
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
              <div
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/${tag.type}s/${tag.id}`);
                  setShowOrHide(+tag.id);
                } }
                data-testid={ `${i}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share button"
                aria-hidden
              >
                <img
                  type="button"
                  src={ shareIcon }
                  alt="Share button"
                />
                <br />
                <h4
                  style={ { display: showOrHide === +tag.id ? 'content' : 'none' } }
                >
                  Link copied!
                </h4>
              </div>
              <img
                type="button"
                data-testid={ `${i}-horizontal-favorite-btn` }
                src={ blackHeart }
                alt="Favorite Button"
              />
            </div>
          ))) }
      </div>
    </section>
  );
}

export default FavoriteRecipes;
