import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function Meals() {
  const { mealsResult } = useContext(Context);
  const DOZE = 12;
  const array = [];
  if (mealsResult.length > 1 && mealsResult.length < DOZE) {
    for (let index = 0; index < mealsResult.length; index += 1) {
      array.push(mealsResult[index]);
    }
  }
  if (mealsResult.length > 1 && mealsResult.length > DOZE) {
    for (let index = 0; index < DOZE; index += 1) {
      array.push(mealsResult[index]);
    }
  }
  console.log(array);
  return (
    <main>
      <Header title="Meals" iconSearch />
      {
        (array.length > 1 ? array.map((e, i) => (
          <div
            key={ e }
            data-testid={ `${i}-recipe-card` }
          >
            <p data-testid={ `${i}-card-name` } key={ e }>{e.strMeal}</p>
            <img data-testid={ `${i}-card-img` } src={ e.strMealThumb } alt="" />
          </div>
        )) : '')
      }
      <Footer />
    </main>
  );
}

export default Meals;
