import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recomendation, setRecomendation] = useState([]);
  const history = useHistory();
  const conditional = history.location.pathname.split('/')[1];
  const idHistory = history.location.pathname.split('/')[2];

  useEffect(() => {
    async function showRecipe() {
      if (conditional === 'meals') {
        const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const result = await responseDrink.json();
        setRecomendation(result.drinks);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idHistory}`);
        const data = await response.json();
        setRecipe(data);
      }
      if (conditional === 'drinks') {
        const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const result = await responseMeal.json();
        setRecomendation(result.meals);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idHistory}`);
        const data = await response.json();
        setRecipe(data);
      }
    } showRecipe();
  }, []);
  console.log(recomendation);
  console.log(recipe && recipe.drinks);
  // console.log(recipe && recipe.meals[0].strIngredient2.length);

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
    // console.log(arrayIng);
    return arrayIng.map((e, index) => (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>{e}</li>
    ));
  };

  const style = {
    position: 'fixed',
    bottom: '0',
  };

  return (
    <>
      <div>RecipeDetails</div>
      {conditional === 'meals'
      && recipe && recipe.meals.map((rec, i) => (
        <div key={ i }>
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
        </div>
      ))}

      {conditional === 'drinks'
      && recipe && recipe.drinks.map((rec, i) => (
        <div key={ i }>
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
        </div>
      ))}
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ style }
      >
        Start Recipe
      </button>
    </>
  );
}
