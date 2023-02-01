import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function Drinks() {
  const { drinksResult } = useContext(Context);
  const DOZE = 12;
  const array = [];
  if (drinksResult.length > 1 && drinksResult.length < DOZE) {
    for (let index = 0; index < drinksResult.length; index += 1) {
      array.push(drinksResult[index]);
    }
  }
  if (drinksResult.length > 1 && drinksResult.length > DOZE) {
    for (let index = 0; index < DOZE; index += 1) {
      array.push(drinksResult[index]);
    }
  }
  /*
    receita
    imagem
    nome
  */
  return (
    <main>
      <Header title="Drinks" iconSearch />
      {
        (array.length > 1 ? array.map((e, i) => (
          <div
            key={ e }
            data-testid={ `${i}-recipe-card` }
          >
            <p data-testid={ `${i}-card-name` } key={ e }>{e.strDrink}</p>
            <img data-testid={ `${i}-card-img` } src={ e.strDrinkThumb } alt="" />
          </div>
        )) : '')
      }
      <Footer />
    </main>
  );
}

export default Drinks;
