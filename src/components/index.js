import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import {
  HashRouter,
  Route
} from 'react-router-dom';

import App from './components/App';
import NotFound from './components/NotFound';

ReactDOM.render((
   <HashRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="*" component={NotFound} />
      </div>
   </HashRouter >
), document.getElementById( 'root' ) )