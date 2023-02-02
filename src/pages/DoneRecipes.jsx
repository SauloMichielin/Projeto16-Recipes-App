import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { require } from 'clipboard-copy';
import Header from '../Components/Header';
import shareImg from '../images/shareIcon.svg';
import localSto from '../mockTemp';

function DoneRecipes() {
  const [localS, setLocalS] = useState([]);
  const [filter, setFilter] = useState('All');
  const history = useHistory();
  const [showOrHide, setShowOrHide] = useState(0);
  const copy = require('clipboard-copy');
  const items = [];
  useEffect(() => {
    const lS = JSON.parse(localStorage.getItem('doneRecipe'));
    if (lS) {
      setLocalS(lS);
    } else if (!lS) {
      setLocalS(localSto);
    }
  }, []);
  if (filter === 'All') {
    localS.filter((e) => items.push(e));
  }
  if (filter === 'Meals') {
    localS.filter((e) => e.type === 'meal' && items.push(e));
  }
  if (filter === 'Drinks') {
    localS.filter((e) => e.type === 'drink' && items.push(e));
  }
  /* [{
    id: id-da-receita,
    type: meal-ou-drink,
    nationality: nacionalidade-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
    }] */

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
          (e.type === 'meals' ? (
            <div key={ i }>
              <div
                onClick={ () => history.push(`/${e.type}/${e.id}`) }
                aria-hidden="true"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt="Foto da receita"
                />
                <h2 data-testid={ `${i}-horizontal-name` }>{e.name}</h2>
              </div>
              <h3 data-testid={ `${i}-horizontal-top-text` }>
                {`${e.nationality} - ${e.category}`}
              </h3>
              <h4 data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</h4>
              <h5 data-testid={ `${i}-${e.tags[i]}-horizontal-tag` }>
                { e.tags.length > 0 && `${e.tags[0]}, ${e.tags[1]}` }
              </h5>
              <div
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => {
                  copy(`http://localhost:3000/${e.type}/${e.id}`);
                  setShowOrHide(+e.id);
                } }
                aria-hidden="true"
              >
                <img
                  src={ shareImg }
                  alt="Compartilhar"
                />
                <br />
                <h4
                  style={ { display: +showOrHide === +e.id ? 'content' : 'none' } }
                >
                  Link copied!
                </h4>
              </div>
            </div>
          ) : (
            <div key={ i }>
              <div
                onClick={ () => history.push(`/${e.type}/${e.id}`) }
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
                  copy(`http://localhost:3000/${e.type}/${e.id}`);
                  setShowOrHide(+e.id);
                  console.log('clickou');
                } }
                aria-hidden="true"
              >
                <img
                  src={ shareImg }
                  alt="Compartilhar"
                />
                <br />
                <h4
                  style={ { display: +showOrHide === +e.id ? 'content' : 'none' } }
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
