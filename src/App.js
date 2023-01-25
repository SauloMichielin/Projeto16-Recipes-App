import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Receitas from './pages/Receitas';

function App() {
  return (
    <div>
      <h1>Trybe</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Receitas } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
