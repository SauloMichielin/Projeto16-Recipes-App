import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useFetchDrinks() {
  const [isLoading, setIsLoading] = useState(false);
  const [drinksResult, setDrinksResult] = useState([]);
  const [idDrink, setIdDrink] = useState(0);
  const history = useHistory();
  const makeDrinksFetch = async (filterOrSearch, endPoint) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filterOrSearch}${endPoint}`);
      const result = await response.json();
      if (!result.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      setDrinksResult(result.drinks);
      if (result.drinks.length === 1) {
        setIdDrink(result.drinks[0].idDrink);
        history.push(`/drinks/${result.drinks[0].idDrink}`);
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeDrinksFetch,
    isLoading,
    drinksResult,
    idDrink,
  };
}

export default useFetchDrinks;
