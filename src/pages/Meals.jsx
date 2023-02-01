import React, { useContext, useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function Meals() {
  const { mealsResult } = useContext(Context);
  const [initialState, setInitialState] = useState([]);
  const [filters, setFilters] = useState([]);
  const DOZE = 12;
  const CINCO = 5;
  const mealsArray = [];
  useEffect(() => {
    async function filtersData() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const result = await response.json();
      for (let index = 0; index < CINCO; index += 1) {
        setFilters((prevState) => [...prevState, result.meals[index]]);
      }
    } filtersData();
    async function fetchData() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      for (let index = 0; index < DOZE; index += 1) {
        setInitialState((prevState) => [...prevState, result.meals[index]]);
      }
    } fetchData();
  }, []);
  if (mealsResult.length > 1 && mealsResult.length < DOZE) {
    for (let index = 0; index < mealsResult.length; index += 1) {
      mealsArray.push(mealsResult[index]);
    }
  }
  if (mealsResult.length > 1 && mealsResult.length > DOZE) {
    for (let index = 0; index < DOZE; index += 1) {
      mealsArray.push(mealsResult[index]);
    }
  }
  return (
    <main>
      <Header title="Meals" iconSearch />
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
        (mealsArray.length > 1 ? (
          mealsArray.map((e, i) => (
            <div
              key={ `${i}-recipe-card-food` }
              data-testid={ `${i}-recipe-card` }
            >
              <p data-testid={ `${i}-card-name` }>{e.strMeal}</p>
              <img data-testid={ `${i}-card-img` } src={ e.strMealThumb } alt="" />
            </div>
          ))
        ) : (
          initialState.map((ele, i) => (
            <div
              key={ `${i}-recipe-card-food-initial` }
              data-testid={ `${i}-recipe-card` }
            >
              <p data-testid={ `${i}-card-name` }>{ele.strMeal}</p>
              <img data-testid={ `${i}-card-img` } src={ ele.strMealThumb } alt="" />
            </div>
          ))
        ))
      }
      <Footer />
    </main>
  );
}

export default Meals;
