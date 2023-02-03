/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import doneRecipes from '../mockTemp';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recomendation, setRecomendation] = useState([]);
  // const [changeButton, setChangeButton] = useState('Start Recipe');
  const history = useHistory();
  const conditional = history.location.pathname.split('/')[1];
  const idHistory = history.location.pathname.split('/')[2];
  const [localS, setLocalS] = useState([]);
  const SEIS = 6;

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const lS = JSON.parse(localStorage.getItem('doneRecipes'));
    setLocalS(lS);
    async function showRecipe() {
      if (conditional === 'meals') {
        const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const result = await responseDrink.json();
        for (let index = 0; index < SEIS; index += 1) {
          setRecomendation((prevState) => [...prevState, result.drinks[index]]);
        }
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idHistory}`);
        const data = await response.json();
        setRecipe(data);
      }
      if (conditional === 'drinks') {
        const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const result = await responseMeal.json();
        for (let index = 0; index < SEIS; index += 1) {
          setRecomendation((prevState) => [...prevState, result.meals[index]]);
        }
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idHistory}`);
        const data = await response.json();
        setRecipe(data);
      }
    } showRecipe();
  }, []);
  console.log(recomendation);
  console.log(localS.map((k) => k.id));

  const ingredients = (param, param2, param3) => {
    const VINTE = 20;
    const arrayIng = [];
    if (param) {
      for (let i = 1; i <= VINTE; i += 1) {
        if (param[`${param2}${i}`]
        && param[`${param2}${i}`].length) {
          arrayIng.push(`${param[`${param2}${i}`]} ----- ${param[`${param3}${i}`]}`);
        }
      }
    }
    return arrayIng.map((e, index) => (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>{e}</li>
    ));
  };

  const styleBtn = {
    position: 'fixed',
    bottom: '0',
  };
  const styleCarousel = {
    display: 'flex',
    overflowX: 'scroll',
    width: '50%',
    gap: '30%',
    marginLeft: '25%',
  };

  return (
    <>
      <div>Recipe Details</div>
      {conditional === 'meals'
      && recipe && recipe.meals.map((rec, i) => (
        <div key={ i }>
          <div>
            <img
              data-testid="recipe-photo"
              src={ rec.strMealThumb }
              alt={ rec.strMeal }
            />
            <h2 data-testid="recipe-title">{ rec.strMeal }</h2>
            <span data-testid="recipe-category">{ rec.strCategory }</span>
            <ul style={ { listStyleType: 'none' } }>
              <li><h4>Ingredientes ----- Quantidades</h4></li>
              {ingredients(rec, 'strIngredient', 'strMeasure')}
            </ul>
            <p data-testid="instructions">{ rec.strInstructions }</p>
            <video muted data-testid="video" width="320" height="240" controls>
              <source src={ rec.strYoutube } type="video/mp4" />
              <source src={ rec.strYoutube } type="video/ogg" />
            </video>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">s2</button>
          </div>
          <div style={ styleCarousel }>
            {recomendation.map((items, ind) => (
              <div data-testid={ `${ind}-recommendation-card` } key={ ind }>
                <h4 data-testid={ `${ind}-recommendation-title` }>{ items.strDrink }</h4>
                <img src={ items.strDrinkThumb } alt={ items.strDrink } />
              </div>
            ))}
          </div>
        </div>
      ))}

      {conditional === 'drinks'
      && recipe && recipe.drinks.map((rec, i) => (
        <div key={ i }>
          <div>
            <img
              data-testid="recipe-photo"
              src={ rec.strDrinkThumb }
              alt={ rec.strDrink }
            />
            <h2 data-testid="recipe-title">{ rec.strDrink }</h2>
            <span data-testid="recipe-category">{ rec.strAlcoholic }</span>
            <ul style={ { listStyleType: 'none' } }>
              <li><h4>Ingredientes ----- Quantidades</h4></li>
              {ingredients(rec, 'strIngredient', 'strMeasure')}
            </ul>
            <p data-testid="instructions">{ rec.strInstructions }</p>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">s2</button>
          </div>
          <div style={ styleCarousel }>
            {recomendation.map((items, ind) => (
              <div data-testid={ `${ind}-recommendation-card` } key={ ind }>
                <h4 data-testid={ `${ind}-recommendation-title` }>{ items.strMeal }</h4>
                <img src={ items.strMealThumb } alt={ items.strMeal } />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ styleBtn }
        onClick={ () => {
          history.push(`/meals/${idHistory}/in-progress`);
        } }
      >
        Start Recipe
      </button>
    </>
  );
}
