/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './RecipeInProgress.css';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// import { favoriteRecipes } from '../mockTemp';

export default function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const tipo = (history.location.pathname).split('/')[1];
  const [filterId, setFilterId] = useState(false);
  const [showOrHide, setShowOrHide] = useState(0);
  const QUINZE = 15;
  const [fav, setFav] = useState(whiteHeart);

  useEffect(() => {
    // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const lS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (lS) {
      lS.some((e) => (e.id === id ? setFav(blackHeart) : setFav(whiteHeart)));
    }

    async function filtersData() {
      if (tipo === 'meals') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        const final = result.meals;
        setFilterId(final);
      }
      if (tipo === 'drinks') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        const final = result.drinks;
        setFilterId(final);
      }
    } filtersData();
  }, []);

  const ingredients = (param) => {
    const arrayzin = [];
    if (param[0] !== undefined) {
      for (let i = 1; i <= QUINZE; i += 1) {
        if (param[0][`strIngredient${i}`] !== null
        && param[0][`strIngredient${i}`].length > 0) {
          arrayzin.push(param[0][`strIngredient${i}`]);
        }
      }
    }
    return arrayzin;
  };
  const pap = ingredients(filterId);

  // Adicionando valores ao local storage

  const dados = document.getElementsByClassName('checkbox1');
  const storageLocal = () => {
    const dadosText = dados[0].innerHTML;
    localStorage.setItem('inProgressRecipes', dadosText);
  };

  const title = tipo === 'meals' ? 'strMeal' : 'strDrink';
  const thumb = tipo === 'meals' ? 'strMealThumb' : 'strDrinkThumb';

  const rename = tipo === 'meals' ? (
    tipo.replace('meals', 'Meal')
  ) : (
    tipo.replace('drinks', 'Drink')
  );

  const handleFavBtn = () => {
    const mapeado = filterId.map((e) => (
      {
        id: e[`id${rename}`],
        type: rename === 'Meal' ? 'meal' : 'drink',
        nationality: e.strArea ? e.strArea : '',
        category: e.strCategory ? e.strCategory : '',
        alcoholicOrNot: e.strAlcoholic ? e.strAlcoholic : '',
        name: e[`str${rename}`],
        image: e[`str${rename}Thumb`],
      }
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(mapeado));
    console.log(filterId);
    console.log(tipo);
    if (fav === whiteHeart) {
      setFav(blackHeart);
    }
    if (fav === blackHeart) {
      setFav(whiteHeart);
    }
  };

  // return -------------------------------------------------------------------------

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ filterId[0] && filterId[0][thumb] }
        alt="alt da imagem"
      />
      <h2 data-testid="recipe-title">
        { filterId[0] && filterId[0][title] }
      </h2>
      {/* <img
        data-testid="share-btn"
        src={ shareIcon }
        alt="Share Icon"
        // onClick={ `${shareButton}` }
      /> */}
      <div
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${tipo}/${id}`);
          setShowOrHide(id);
        } }
        aria-hidden="true"
        src={ shareIcon }
        alt="Compartilhar"
      >
        <img
          src={ shareIcon }
          alt="Compartilhar"
        />
        <br />
        <h4
          style={ { display: showOrHide === id ? 'content' : 'none' } }
        >
          Link copied!
        </h4>
      </div>
      <img
        data-testid="favorite-btn"
        src={ fav }
        onClick={ handleFavBtn }
        alt="Share Icon"
        aria-hidden
      />
      <h3 data-testid="recipe-category">
        { filterId[0] !== undefined ? filterId[0].strCategory : '' }
      </h3>
      <p data-testid="instructions">
        { filterId[0] !== undefined ? filterId[0].strInstructions : '' }
      </p>
      <div className="checkbox1">
        {/* { doc.innerHTML } */}
        { pap.map((a, index) => (
          <label
            htmlFor={ a }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ a }
              id={ a }
              className="checkbox2"
              onClick={ storageLocal }
            />
            { a }
          </label>
        )) }
      </div>
      <button
        data-testid="finish-recipe-btn"
        // onClick={  }
      >
        Finalizar
      </button>
    </div>
  );
}
