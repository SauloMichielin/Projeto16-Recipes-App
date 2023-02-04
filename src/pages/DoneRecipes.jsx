import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import shareImg from '../images/shareIcon.svg';

function DoneRecipes() {
  const [localS, setLocalS] = useState([]);
  const [filter, setFilter] = useState('All');
  const history = useHistory();
  const [showOrHide, setShowOrHide] = useState(0);
  const items = [];
  useEffect(() => {
    const lS = JSON.parse(localStorage.getItem('doneRecipes'));
    setLocalS(lS);
  }, []);

  if (filter === 'All' && localS) {
    localS.filter((e) => items.push(e));
  }
  if (filter === 'Meals' && localS) {
    localS.filter((e) => e.type === 'meal' && items.push(e));
  }
  if (filter === 'Drinks' && localS) {
    localS.filter((e) => e.type === 'drink' && items.push(e));
  }

  return (
    <section>
      <Header title="Done Recipes" />
      <button data-testid="filter-by-meal-btn" onClick={ () => setFilter('Meals') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => setFilter('Drinks') }>
        Drinks
      </button>
      <button data-testid="filter-by-all-btn" onClick={ () => setFilter('All') }>
        All
      </button>
      {
        items.map((e, i) => (
          (e.type === 'meal' ? (
            <div key={ i }>
              <div
                onClick={ () => history.push(`/${e.type}s/${e.id}`) }
                aria-hidden="true"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt="Foto da receita"
                />
                <h2 data-testid={ `${i}-horizontal-name` }>{e.name}</h2>
              </div>
              <h4
                data-testid={ `${i}-horizontal-top-text` }
              >
                {`${e.nationality} - ${e.category}`}
              </h4>
              <h4 data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</h4>
              <h5 data-testid={ `${i}-${e.tags[0]}-horizontal-tag` }>{ e.tags[0]}</h5>
              <h5 data-testid={ `${i}-${e.tags[1]}-horizontal-tag` }>{ e.tags[1]}</h5>
              <div
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/${e.type}s/${e.id}`);
                  setShowOrHide(+e.id);
                } }
                aria-hidden="true"
                src={ shareImg }
                alt="Compartilhar"
              >
                <img
                  src={ shareImg }
                  alt="Compartilhar"
                />
                <br />
                <h4
                  style={ { display: showOrHide === +e.id ? 'content' : 'none' } }
                >
                  Link copied!
                </h4>
              </div>
            </div>
          ) : (
            <div key={ i }>
              <div
                onClick={ () => history.push(`/${e.type}s/${e.id}`) }
                aria-hidden="true"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt="Foto da receita"
                />
                <h2 data-testid={ `${i}-horizontal-name` }>{e.name}</h2>
              </div>
              <h3 data-testid={ `${i}-horizontal-top-text` }>{e.alcoholicOrNot}</h3>
              <h4 data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</h4>
              <div
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/${e.type}s/${e.id}`);
                  setShowOrHide(+e.id);
                } }
                aria-hidden="true"
                src={ shareImg }
                alt="Compartilhar"
              >
                <img
                  src={ shareImg }
                  alt="Compartilhar"
                />
                <br />
                <h4
                  style={ { display: showOrHide === +e.id ? 'content' : 'none' } }
                >
                  Link copied!
                </h4>
              </div>
            </div>
          ))))
      }
    </section>
  );
}

export default DoneRecipes;
