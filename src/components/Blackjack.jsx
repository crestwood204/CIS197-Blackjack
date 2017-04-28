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
  //DEALER CARDS:
    const dealer_hand = this.props.state.dealer_cards.map((card, c) => {
      if (this.props.state.player_turn && c === 0) {
        return <Card index={c} number={this.props.state.dealer_cards[c][0]} suit={this.props.state.dealer_cards[c][1]} key={c} hidden={true}></Card>;
      } else {
        return <Card index={c} number={this.props.state.dealer_cards[c][0]} suit={this.props.state.dealer_cards[c][1]} key={c} hidden={false}></Card>;
      }
    });

    const dealer = <div className="dealer">
      <p> Dealer: </p>
      <div className="dealer_hand">
      {dealer_hand}
      </div>
      </div>;

  //PLAYER CARDS:
    const increment_key = (number) => {
      return this.props.state.dealer_cards.length + number;
    }

    const player_hand = this.props.state.player_cards.map((card, c) => {
      return <Card index={c} number={this.props.state.player_cards[c][0]} suit={this.props.state.player_cards[c][1]} key={c + 100} hidden={false}> </Card>
    });

    const player = <div className="player">
      <p> Player: </p>
      <div className="player_hand">
      {player_hand}
      </div>
      </div>;
  
  //HUD:
    const money = <div className="money">
      <h4>Money: {this.props.state.money}</h4>
      </div>

    const bet = <div className="bet">
      <h4>Bet: {this.props.state.bet}</h4>
      </div>

  //MESSAGES:
    const bet_message = <div className="message">
      <p> BET TO PLAY! </p>
      </div>;

    const dealer_busted = <div className="message">
      <p> Dealer Busted! </p>
      </div>;

    const player_busted = <div className="message">
      <p> YOU BUSTED! </p>
      </div>;

    const player_won = <div className="message">
      <p> YOU WON! </p>
      </div>;

    const dealer_won = <div className="message">
      <p> DEALER WON! </p>
      </div>;

    const tie = <div className="message">
      <p> TIE! </p>
      </div>;

    const lost = <div className="message">
      <p> YOU LOST! RELOAD THE PAGE TO PLAY AGAIN! </p>
      </div>;

  //BUTTONS:
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

  //RENDERING:
    if (this.props.state.money === 0 && this.props.state.bet === 0) {
      return (<div className="game">{dealer}{money}{bet}{player}{lost}{bets}{dealer_controls}</div>);
    } else if (this.props.state.bet_zero) {
      return (<div className="game">{dealer}{money}{bet}{player}{bet_message}{bets}{dealer_controls}</div>);
    } else if (this.props.state.busted) {
      console.log('onBusted');
      return (<div className="game">{dealer}{money}{bet}{player}{player_busted}{bets}{dealer_controls}</div>);

    } else if (this.props.state.dealer_busted) {
      console.log('onDealerBusted');
      return (<div className="game">{dealer}{money}{bet}{player}{dealer_busted}{bets}{dealer_controls}</div>);

    } else if (this.props.state.player_won) {
      console.log("onPlayerWin");
      return (<div className="game">{dealer}{money}{bet}{player}{player_won}{bets}{dealer_controls}</div>);
    } else if (this.props.state.dealer_won) {
      console.log("onDealerWin");
      return (<div className="game">{dealer}{money}{bet}{player}{dealer_won}{bets}{dealer_controls}</div>);
    } else if (this.props.state.tie) {
      console.log('onTie');
      return (<div className="game">{dealer}{money}{bet}{player}{tie}{bets}{dealer_controls}</div>);
    } else if (this.props.state.player_turn) {
      console.log('onPlayerTurn');
      console.log(this.props.state.count);
      return (<div className="game">{dealer}{money}{bet}{player}{bets}{controls}</div>);
    } else {
      console.log('else');
      return (<div className="game">{dealer}{money}{bet}{player}{bets}{dealer_controls}</div>);
    }
  }
}
