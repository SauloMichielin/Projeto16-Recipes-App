import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import useFetchDrinks from '../Hooks/useFetchDrinks';

function Drinks() {
  const { drinksResult } = useFetchDrinks();
  console.log(drinksResult);
  return (
    <main>
      <Header title="Drinks" iconSearch />
      { drinksResult.length === 0 ? ''
        : <h4>XABLAU</h4>}
      <Footer />
    </main>
  );
}

export default Drinks;
