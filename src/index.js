// src/routes.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './components/styles/index.css'
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers/reducers';
import * as initialState from './initialState';
import NotFound from './components/NotFound';
import { Provider } from 'react-redux';
import Root from './routes';
import Blackjack from './components/Blackjack';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

const store = createStore(reducers, initialState);

ReactDOM.render((
  //<Root store={store}/>

  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Blackjack} store={store}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
  
), document.getElementById( 'root' ) )
