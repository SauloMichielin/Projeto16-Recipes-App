import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useFetchMeals() {
  const [mealsReturn, setMealsReturn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idMeal, setIdMeal] = useState(0);
  const history = useHistory();
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
        return;
      }
      setMealsReturn(result.meals);
      if (result.meals.length === 1) {
        setIdMeal(result.meals[0].idMeal);
        history.push(`/meals/${result.meals[0].idMeal}`);
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeMealsFetch,
    isLoading,
    mealsReturn,
    idMeal,
  };
}

export default useFetchMeals;
