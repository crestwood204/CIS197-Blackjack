import _ from 'lodash';
import React from 'react';
import Card from './Card';
import * as actions from '../actions/actions.js';
import * as initialState from '../initialState.js';
import $ from 'jquery';

export default class Blackjack extends React.Component {
  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  constructor() {
    super();
    this.state = initialState;
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
    console.log(this.props.state);
    console.log(this.props.state.busted);
    console.log('componentWillMount');
  }

  onBet(amount) {
    console.log("betting: " + amount);
    this.props.dispatch(actions.bet(amount));
  }

  onReset() {
    this.props.dispatch(actions.reset());
  }

  onHit() {
    this.props.dispatch(actions.hit());
    this.render();
  }

  onStand() {
    this.props.dispatch(actions.stand());
  }

  onDeal() {
    this.props.dispatch(actions.deal());
  }

  onBusted() {
    this.props.dispatch(actions.busted());
  }

  onDealerTurn() {
    this.props.dispatch(actions.dealerTurn());
  }

  onDealerBusted() {
    this.props.dispatch(actions.dealerBusted());
  }
  render() {
    console.log("rendering");
    console.log(this.props.state.dealer_cards);
    const dealer_hand = this.props.state.dealer_cards.map((card, c) => {
      console.log("called");
      if (this.props.state.player_turn && c === 0) {
        return <Card index={c} number={this.props.state.dealer_cards[c]} key={c} hidden={true}></Card>;
      } else {
        return <Card index={c} number={this.props.state.dealer_cards[c]} key={c} hidden={false}></Card>;
      }
    });

    const dealer = <div className="dealer">
      <p> Dealer: </p>
      <div className="dealer_hand">
      {dealer_hand}
      </div>
      </div>;

    const increment_key = (number) => {
      return this.props.state.dealer_cards.length + number;
    }

    console.log(this.props.state.player_cards);
    const player_hand = this.props.state.player_cards.map((card, c) => {
      console.log("player called");
      return <Card index={c} number={this.props.state.player_cards[c]} key={c + 100} hidden={false}> </Card>
    });

    const player = <div className="player">
      <p> Player: </p>
      <div className="player_hand">
      {player_hand}
      </div>
      </div>;

    const money = <div className="money">
        <h4>Money: {this.props.state.money}</h4>
        </div>

    const bet = <div className="bet">
    <h4>Bet: {this.props.state.bet}</h4>
    </div>

    const bets = <div className="bets">
      <h4>Bets</h4> 
      <button key='10' onClick={_.partial(this.onBet, 10)}>bet_10</button> 
      <button key='25' onClick={_.partial(this.onBet, 25)}>bet_25</button>
      <button key='50' onClick={_.partial(this.onBet, 50)}>bet_50</button>
      <button key='100' onClick={_.partial(this.onBet, 100)}>bet_100</button>
      <button key='Reset Bet' onClick={this.onReset}>reset</button>
      </div>

    const dealer_controls = <div className="controls">
      <h4>Controls</h4>
      <button key='Deal' onClick={this.onDeal}>deal</button>
      <button key='Hit' onClick={this.onHit}>hit</button>
      <button key="Stand" onClick={this.onStand}>stand</button>
      </div>

    const controls = <div className="controls">
      <h4>Controls</h4>
      <button key='Hit' onClick={this.onHit}>hit</button>
      <button key="Stand" onClick={this.onStand}>stand</button>
      </div>;

    $('.game').remove();
    if (this.props.state.busted) {
      console.log('onBusted');
      this.onBusted();
      $('.root').append(<div className="game">{dealer}{money}{bet}<p> YOU BUSTED!></p>{bets}{controls}</div>);
    } else if (this.props.state.dealer_busted) {
      console.log('onDealerBusted');
      this.onDealerBusted();
      $('.root').append(<div className="game"><p> DEALER BUSTED!></p>{money}{bet}{player}{bets}{controls}</div>);
    } else if (this.props.state.player_turn) {
      console.log('onPlayerTurn');
      $('.root').append(<div className="game">{dealer}{money}{bet}{player}{bets}{controls}</div>);
    } else {
      console.log('onDealerTurn');
      this.onDealerTurn();
      $('.root').append(<div className="game">{dealer}{money}{bet}{player}{bets}{dealer_controls}</div>);
    }
    if (this.props.state.busted) {
      console.log('onBusted');
      this.onBusted();
      return (<div className="game">{dealer}{money}{bet}<p> YOU BUSTED!></p>{bets}{controls}</div>);
    } else if (this.props.state.dealer_busted) {
      console.log('onDealerBusted');
      this.onDealerBusted();
      return (<div className="game"><p> DEALER BUSTED!></p>{money}{bet}{player}{bets}{controls}</div>);
    } else if (this.props.state.player_turn) {
      console.log('onPlayerTurn');
      return (<div className="game">{dealer}{money}{bet}{player}{bets}{controls}</div>);
    } else {
      console.log('onDealerTurn');
      this.onDealerTurn();
      return (<div className="game">{dealer}{money}{bet}{player}{bets}{dealer_controls}</div>);
    }
  }
}
