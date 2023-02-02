import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './RecipeInProgress.css';

// http://localhost:3000/meals/52771/in-progress
// http://localhost:3000/drinks/178319/in-progress

export default function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const tipo = (history.location.pathname).split('/')[1];
  const [filterId, setFilterId] = useState(false);
  const VINTE = 20;

  useEffect(() => {
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
      for (let i = 1; i <= VINTE; i += 1) {
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

  const parser = new DOMParser();
  const doc = parser.parseFromString(localStorage.getItem('inProgressRecipes')
    .innerHTML, 'text/html');
  // console.log(doc.getElementsByClassName('checkboxIngredientes'));
  const oHtml = doc.getElementsByClassName('checkboxIngredientes');
  dados.innerHTML = oHtml;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ filterId[0] !== undefined ? filterId[0].strMealThumb : '' }
        alt="alt da imagem"
      />
      <h2 data-testid="recipe-title">
        { filterId[0] !== undefined ? filterId[0].strMeal : '' }
      </h2>
      <button
        data-testid="share-btn"
        // onClick={ `${shareButton}` }
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        // onClick={ `${favoriteButton}` }
      >
        Favoritar
      </button>
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
            className="checkboxIngredientes"
          >
            <input type="checkbox" name={ a } id={ a } onClick={ storageLocal } />
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
