import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useFetchMeals() {
  const [mealsResult, setMealsResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idMeal, setIdMeal] = useState(0);
  const history = useHistory();
  const makeMealsFetch = async (filterOrSearch, endPoint) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filterOrSearch}${endPoint}`);
      const result = await response.json();
      if (!result.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      setMealsResult(result.meals);
      if (result.meals.length === 1) {
        setIdMeal(result.meals[0].idMeal);
        history.push(`/meals/${result.meals[0].idMeal}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeMealsFetch,
    isLoading,
    mealsResult,
    idMeal,
  };
}

export default useFetchMeals;
