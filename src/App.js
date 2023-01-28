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
import Receitas from './pages/Receitas';

function App() {
  return (
    <div>
      <h1>Trybe</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id-da-receita" component={ MealRecipe } />
        <Route path="/drinks/:id-da-receita" component={ DrinkRecipe } />
        <Route
          path="/meals/:id-da-receita/in-progress"
          component={ MealRecipeInProgress }
        />
        <Route
          path="/meals/:id-da-receita/in-progress"
          component={ DrinkRecipeInProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals" component={ Receitas } />
      </Switch>
    </div>
  );
}

export default App;
