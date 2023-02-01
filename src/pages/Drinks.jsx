import React, { useContext, useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function Drinks() {
  const { drinksResult } = useContext(Context);
  const [initialState, setInitialState] = useState([]);
  const [filters, setFilters] = useState([]);
  const DOZE = 12;
  const CINCO = 5;
  const DrinksArray = [];
  useEffect(() => {
    async function filtersData() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const result = await response.json();
      for (let index = 0; index < CINCO; index += 1) {
        setFilters((prevState) => [...prevState, result.drinks[index]]);
      }
    } filtersData();
    async function fetchData() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      for (let index = 0; index < DOZE; index += 1) {
        setInitialState((prevState) => [...prevState, result.drinks[index]]);
      }
    } fetchData();
  }, []);
  if (drinksResult.length > 1 && drinksResult.length < DOZE) {
    for (let index = 0; index < drinksResult.length; index += 1) {
      DrinksArray.push(drinksResult[index]);
    }
  }
  if (drinksResult.length > 1 && drinksResult.length > DOZE) {
    for (let index = 0; index < DOZE; index += 1) {
      DrinksArray.push(drinksResult[index]);
    }
  }
  /*
    receita
    imagem
    nome
  */
  return (
    <main>
      <Header title="Drinks" iconSearch />
      {
        filters.map((laEle, ix) => (
          <button
            data-testid={ `${laEle.strCategory}-category-filter` }
            key={ ix }
          >
            {laEle.strCategory}
          </button>
        ))
      }
      {
        initialState.map((ele, i) => (
          <div
            key={ i }
            data-testid={ `${i}-recipe-card` }
          >
            <p data-testid={ `${i}-card-name` } key={ i }>{ele.strDrink}</p>
            <img data-testid={ `${i}-card-img` } src={ ele.strDrinkThumb } alt="" />
          </div>
        ))
      }
      {
        (DrinksArray.length > 1 ? DrinksArray.map((e, i) => (
          <div
            key={ e }
            data-testid={ `${i}-recipe-card` }
          >
            <p data-testid={ `${i}-card-name` } key={ e }>{e.strDrink}</p>
            <img data-testid={ `${i}-card-img` } src={ e.strDrinkThumb } alt="" />
          </div>
        )) : '')
      }
      <Footer />
    </main>
  );
}

export default Drinks;
