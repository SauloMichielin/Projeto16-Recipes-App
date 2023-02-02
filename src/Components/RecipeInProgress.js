import React from 'react';
// import { useHistory } from 'react-router-dom';

// http://localhost:3000/meals/52771/in-progress

export default function RecipeInProgress() {
  // const history = useHistory();
  // console.log(history);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src="http://localhost:3000/meals/52771/in-progress"
        alt="alt da imagem"
      />
      <h2 data-testid="recipe-title">Título</h2>
      <button
        data-testid="share-btn"
        // onClick={ `${shareButton}` }
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        // onClick={ `${favoriteButton}` }
      >
        Favoritar
      </button>
      <h3 data-testid="recipe-category">Categoria</h3>
      <p data-testid="instructions">Instruções</p>
      <button
        data-testid="finish-recipe-btn"
        // onClick={  }
      >
        Finalizar
      </button>
    </div>
  );
}
