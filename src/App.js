import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealRecipe from './pages/MealRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealRecipeInProgress from './pages/MealRecipeInProgress';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import Recipe from './pages/Recipes';

function App() {
  return (
    <div>
      <h1>Trybe</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ MealRecipe } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ MealRecipeInProgress }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ DrinkRecipeInProgress }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals" component={ Recipe } />
      </Switch>
    </div>
  );
}

export default App;
