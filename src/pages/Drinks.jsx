import React, { useContext, useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function Drinks() {
  const { drinksResult } = useContext(Context);
  const [initialState, setInitialState] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterSelect, setFilterSelect] = useState(false);
  const DOZE = 12;
  const CINCO = 5;
  const drinksArray = [];
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
      drinksArray.push(drinksResult[index]);
    }
  }
  if (drinksResult.length > 1 && drinksResult.length > DOZE) {
    for (let index = 0; index < DOZE; index += 1) {
      drinksArray.push(drinksResult[index]);
    }
  }
  /*
    receita
    imagem
    nome
  */
  const filterCategory = async (sel) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${sel.strCategory}`;
    const response = await fetch(url);
    const data = await response.json();
    const dataFinal = [];
    if (data.drinks.length >= 1 && data.drinks.length < DOZE) {
      for (let index = 0; index < data.drinks.length; index += 1) {
        dataFinal.push(data.drinks[index]);
      }
    }
    if (data.drinks.length >= 1 && data.drinks.length > DOZE) {
      for (let index = 0; index < DOZE; index += 1) {
        dataFinal.push(data.drinks[index]);
      }
    }
    setInitialState(dataFinal);
  };

  const filterOrigin = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    const arrayResult = [];
    for (let index = 0; index < DOZE; index += 1) {
      arrayResult.push(result.drinks[index]);
    }
    setInitialState(arrayResult);
  };

  return (
    <main>
      <Header title="Drinks" iconSearch />
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
        onClick={ () => filterOrigin() }
      >
        Remover Filtros
      </button>
      {drinksArray.length > 1 ? (
        drinksArray.map((e, i) => (
          <div
            key={ `${i}-recipe-card-drink` }
            data-testid={ `${i}-recipe-card` }
          >
            <p data-testid={ `${i}-card-name` } key={ e }>{e.strDrink}</p>
            <img data-testid={ `${i}-card-img` } src={ e.strDrinkThumb } alt="" />
          </div>
        ))) : (
        initialState.map((ele, i) => (
          <div
            key={ `${i}-recipe-card-drink-initial` }
            data-testid={ `${i}-recipe-card` }
          >
            <p data-testid={ `${i}-card-name` }>{ele.strDrink}</p>
            <img data-testid={ `${i}-card-img` } src={ ele.strDrinkThumb } alt="" />
          </div>
        ))
      )}
      <Footer />
    </main>
  );
}

export default Drinks;
