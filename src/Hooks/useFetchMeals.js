import { useState } from 'react';

function useFetchMeals() {
  const [mealsReturn, setMealsReturn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const makeMealsFetch = async (filterOrSearch, endPoint) => {
    // filterOrSearch tem que usar filter.php?i= OU search.php?s= OU search.php?f=
    // filterOrSearch tem o parametro passado pelo radioButton
    // endPoint tem que usar o que tem no Input
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filterOrSearch}${endPoint}`);
      const result = await response.json();
      console.log(result);
      if (!result.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setMealsReturn(result.meals);
      return result;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeMealsFetch,
    isLoading,
    mealsReturn,
  };
}

export default useFetchMeals;
