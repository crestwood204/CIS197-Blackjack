import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Switch } from 'react-router-dom';
import Blackjack from './components/Blackjack.jsx';
import NotFound from './components/NotFound/';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={Blackjack} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;