import _ from 'lodash';
import React from 'react';
import Card from './Card';


export default class Blackjack extends React.Component {
  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  constructor() {
    super();
    this.state = initialState;
    this.onImportSeed = this.onImportSeed.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStep = this.onStep.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onExportMap = this.onExportMap.bind(this);
    this.onRandomSeed = this.onRandomSeed.bind(this);
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  onImportSeed(seedName) {
    this.props.store.dispatch(actions.importSeed(seedName));
  }

  // TODO: here you'll want to implement the functions that get called
  //       when various actions (such as button clicks) occur in thie view.
  //       These functions should, like onImportSeed above, dispatch the
  //       appropriate actions using the Redux store prop.

  render() {
    return <Card store={this.props.store} index = {0}></Card>
  }

Blackjack.propTypes = {
  store: React.PropTypes.object.isRequired
};