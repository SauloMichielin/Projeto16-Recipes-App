import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// http://localhost:3000/meals/52771/in-progress
// http://localhost:3000/drinks/178319/in-progress

export default function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const tipo = (history.location.pathname).split('/')[1];
  const [filterId, setFilterId] = useState(false);
  const QUINZE = 15;

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
  console.log(ingredients(filterId));

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src="http://localhost:3000/meals/52771/in-progress"
        alt="alt da imagem"
      />
      <h2 data-testid="recipe-title">Título</h2>
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
      <h3 data-testid="recipe-category">Categoria</h3>
      <p data-testid="instructions">Instruções</p>
      { pap.map((a, index) => (
        <label
          htmlFor={ a }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input type="checkbox" name={ a } id={ a } />
          { a }
        </label>
      )) }
      <button
        data-testid="finish-recipe-btn"
        // onClick={  }
      >
        Finalizar
      </button>
    </div>
  );
}
