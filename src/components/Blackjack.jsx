import _ from 'lodash';
import React from 'react';
import Card from './Card';
import * as actions from '../actions/actions.js';
import * as initialState from '../initialState.js';
import { connect } from 'redux';


export default class Blackjack extends React.Component {
  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  constructor() {
    super();
    this.onBet = this.onBet.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onHit = this.onHit.bind(this);
    this.onStand = this.onStand.bind(this);
    this.onDeal = this.onDeal.bind(this);
    this.onBusted = this.onBusted.bind(this);
    this.onDealerTurn = this.onDealerTurn.bind(this);
    this.onDealerBusted = this.onDealerBusted.bind(this);
  }

  componentWillMount() {
    this.store = this.props.route.store;
    console.log(this.store);
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
    console.log("componentDidMount");
  }

  onBet(amount) {
    this.props.store.dispatch(actions.bet(amount));
  }

  onReset() {
    this.props.store.disptach(actions.reset());
  }

  onHit() {
    this.props.store.dispatch(actions.hit());
  }

  onStand() {
    this.props.store.dispatch(actions.stand());
  }

  onDeal() {
    this.props.store.dispatch(actions.deal());
  }

  onBusted() {
    this.props.store.dispatch(actions.busted());
  }

  onDealerTurn() {
    this.props.store.dispatch(actions.dealerTurn());
  }

  onDealerBusted() {
    this.props.store.dispatch(actions.dealerBusted());
  }
  render() {
    console.log(this.props.store);
    
    const dealer_hand = () => {
      for (var i = 0; i < this.state.dealer_cards.length; i++) {
        var card;
        if (this.state.player_turn && i === 0) {
          card = <Card store={this.props.store} index={i} number={this.state.dealer_cards[i]} key={i} hidden={true}></Card>;
        } else {
          card = <Card store={this.props.store} index={i} number={this.state.dealer_cards[i]} key={i} hidden={false}></Card>;
        }
        return card;
      }
    }

    const dealer = <div className="dealer">
      <p> Dealer: </p>
      <div className="dealer_hand">
      {dealer_hand}
      </div>
      </div>;

    const increment_key = (number) => {
      return this.state.dealer_cards.length + number;
    }

    const player_hand = () => {
      for (var i = 0; i < this.state.player_cards.length; i++) {
        var number = increment_key(i);
        return <Card store={this.props.store} index={i} number={this.state.dealer_cards} key={number}> hidden={false}</Card>
      }
    }

    const player = <div className="player">
      <p> Player: </p>
      <div className="player_hand">
      {player_hand}
      </div>
      </div>;

    const bets = <div className="bets">
      <h4>Bets</h4> 
      <button key='10' onClick={_.partial(this.onBet, 10)}>bet_10</button> 
      <button key='25' onClick={_.partial(this.onBet, 25)}>bet_25</button>
      <button key='50' onClick={_.partial(this.onBet, 50)}>bet_50</button>
      <button key='100' onClick={_.partial(this.onBet, 100)}>bet_100</button>
      <button key='Reset Bet' onClick={this.onReset}>reset</button>;
      </div>;

    const dealer_controls = <div className="controls">
      <button key='Deal' onClick={this.onDeal}>deal</button>
      <button key='Hit' onClick={this.onHit}>hit</button>
      <button key="Stand" onClick={this.onStand}>stand</button>
      </div>;

    const controls = <div className="controls">
      <button key='Hit' onClick={this.onHit}>hit</button>
      <button key="Stand" onClick={this.onStand}>stand</button>
      </div>;
    if (this.state.busted) {
      this.onBusted();
      return (<div className="game">{dealer}<p> YOU BUSTED!></p>{bets}{controls}</div>);
    } else if (this.state.dealer_busted) {
      this.onDealerBusted();
      return (<div className="game"><p> DEALER BUSTED!></p>{bets}{controls}</div>);
    } else if (this.state.player_turn) {
      return (<div className="game">{dealer}{player}{bets}{controls}</div>);
    } else {
      this.onDealerTurn();
      return (<div className="game">{dealer}{player}{bets}{dealer_controls}</div>);
    }
  }
}
/*
let mapStateToProps = (state) => {
  return state;
} 

let mapDispatchToProps = (state) => {
  return state;
}

const blackjack = connect(mapStateToProps, mapDispatchToProps)(Blackjack);

export default blackjack
*/