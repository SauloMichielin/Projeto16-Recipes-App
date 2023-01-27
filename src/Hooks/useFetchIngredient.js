import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const makeFetch = async (filterOrSearch, endPoint) => {
    // filterOrSearch tem que usar filter.php?i= OU search.php?s= OU search.php?f=
    // filterOrSearch tem o parametro passado pelo radioButton
    // endPoint tem que usar o que tem no Input
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${filterOrSearch}${endPoint}`);
      const result = await response.json();
      console.log(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetch,
    isLoading,
  };
}

export default useFetch;