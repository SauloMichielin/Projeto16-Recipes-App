import { useState } from 'react';

function useFetchDrinks() {
  const [isLoading, setIsLoading] = useState(false);
  const makeDrinksFetch = async (filterOrSearch, endPoint) => {
    // filterOrSearch tem que usar filter.php?i= OU search.php?s= OU search.php?f=
    // filterOrSearch tem o parametro passado pelo radioButton
    // endPoint tem que usar o que tem no Input
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filterOrSearch}${endPoint}`);
      const result = await response.json();
      console.log(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeDrinksFetch,
    isLoading,
  };
}

export default useFetchDrinks;
