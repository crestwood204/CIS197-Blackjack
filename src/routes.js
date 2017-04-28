import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BlackjackWrapper from './components/BlackjackWrapper';
import NotFound from './components/NotFound/';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BlackjackWrapper} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
