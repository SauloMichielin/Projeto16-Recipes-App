import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function Meals() {
  const { mealsResult } = useContext(Context);
  // console.log(mealsResult);
  const [initialState, setInitialState] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterSelect, setFilterSelect] = useState(false);
  // const [initialDrink, setInitialDrink] = useState([]);
  const history = useHistory();
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

  const filterCategory = async (sel) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${sel.strCategory}`;
    const response = await fetch(url);
    const data = await response.json();
    const dataFinal = [];
    if (data.meals.length >= 1 && data.meals.length < DOZE) {
      for (let index = 0; index < data.meals.length; index += 1) {
        dataFinal.push(data.meals[index]);
      }
    }
    if (data.meals.length >= 1 && data.meals.length > DOZE) {
      for (let index = 0; index < DOZE; index += 1) {
        dataFinal.push(data.meals[index]);
      }
    }
    setInitialState(dataFinal);
  };

  const filterOrigin = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    const arrayResult = [];
    for (let index = 0; index < DOZE; index += 1) {
      arrayResult.push(result.meals[index]);
    }
    setInitialState(arrayResult);
  };

  return (
    <main>
      <Header title="Meals" iconSearch />
      {
        filters.map((laEle, ix) => (
          <button
            data-testid={ `${laEle.strCategory}-category-filter` }
            key={ ix }
            onClick={ () => {
              console.log(filterCategory(laEle));
              if (filterSelect === false) {
                filterCategory(laEle);
                setFilterSelect(true);
                return;
              }
              if (filterSelect === true) {
                filterOrigin();
                setFilterSelect(false);
              }
            } }
          >
            {laEle.strCategory}
          </button>
        ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ async () => filterOrigin() }
      >
        Remover Filtros
      </button>
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
              onClick={ () => history.push(`/meals/${ele.idMeal}`) }
              aria-hidden="true"
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
