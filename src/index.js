// src/routes.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './components/styles/index.css'
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import * as initialState from './initialState';
import Root from './routes';

const store = createStore(reducers, initialState);

ReactDOM.render((

  <Root store={store}/>
  
), document.getElementById( 'root' ) )
