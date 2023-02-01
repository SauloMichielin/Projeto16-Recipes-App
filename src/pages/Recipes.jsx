import React from 'react';
import { useHistory } from 'react-router-dom';
import Drinks from './Drinks';
import Meals from './Meals';

export default function Recipes() {
  const history = useHistory();
  return (
    <div>
      {
        history.location.pathname === '/meals' ? <Meals /> : <Drinks />
      }
    </div>
  );
}
