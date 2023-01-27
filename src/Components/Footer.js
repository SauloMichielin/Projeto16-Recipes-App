import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <div className="Footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="Drink icon"
        onClick={ () => history.push('/drinks') }
      >
        Bebidas
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        alt="Meal icon"
        onClick={ () => history.push('/meals') }
      >
        Comidas
      </button>
    </div>
  );
}
