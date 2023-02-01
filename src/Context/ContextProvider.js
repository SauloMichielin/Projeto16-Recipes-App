import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Context from './Context';
import useFetchDrinks from '../Hooks/useFetchDrinks';
import useFetchMeals from '../Hooks/useFetchMeals';

function ContextProvider({ children }) {
  const { drinksResult, makeDrinksFetch } = useFetchDrinks();
  const { mealsResult, makeMealsFetch } = useFetchMeals();
  const allResults = useMemo(() => (
    {
      mealsResult,
      makeMealsFetch,
      drinksResult,
      makeDrinksFetch,
    }
  ), [drinksResult, mealsResult]);
  return (
    <Context.Provider value={ allResults }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
