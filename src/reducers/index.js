import * as initialState from '../initialState.js';
import _ from 'lodash';

var mainReducer = function mainReducer(state, action) {
  var bet;
  var money;
  var card_number;
  var card_suit;
  var player_cards;
  var dealer_cards;
  var deck;
  var random;
  var dealer_count;
  var count;
  var busted;
  var dealer_busted;
  var player_turn;
  var card;
  var i;
  switch(action.type) {
    case 'BET': {
      if (state.player_turn) {
        return state;
      }
      //if you have enough money, bet the amount
      bet = state.bet;
      money = state.money;
      if (state.money >= action.amount) {
        bet += action.amount;
        money -= action.amount;
      }
      return _.assign({}, state, {bet: bet, money: money});
    }
    case 'RESET': {
      if (state.player_turn) {
        return state;
      }
      money = state.money;
      money += state.bet;
      return _.assign({}, state, {bet: 0, money: money});
    }
    case 'HIT': {
      if (state.busted || !state.player_turn) {
        console.log("returning state");
        return state;
      }
      //get new card number
      deck = state.deck;
      bet = state.bet;

      //make sure deck isn't empty, if it is, reshuffle
      if (deck.length < 1) {
        deck = initialState.deck;
      }

      random = Math.floor(Math.random() * deck.length);
      card_number = deck[random][0];
      card_suit = deck[random][1];
      deck.splice(random, 1);

      //push card to player cards array
      card = [card_number, card_suit];
      player_cards = state.player_cards;
      player_cards.push(card);

      if (card_number === 11 || card_number === 12 || card_number === 13) {
        card_number = 10;
      }
      //increment player count
      count = state.count;
      count += card_number;

      //check if player has busted
      busted = state.busted;
      player_turn = state.player_turn;
      if (count > 21) {
        busted = true;
        player_turn = false;
        bet = 0;
      }
  
      return _.assign({}, state, {deck: deck, player_cards: player_cards, count: count, busted: busted, bet: bet, player_turn: player_turn});
    }
    case 'DEAL': {
      //make sure bet is greater than zero
      if (state.bet < 1) {
        return _.assign({}, state, {bet_zero: true});
      }

      deck = state.deck;
      player_cards = [];
      dealer_cards = [];
      count = 0;
      dealer_count = 0;

      //get 2 fresh cards from the deck for dealer and player
      for (i = 0; i < 4; i++) {
        //check if deck is empty
        if (deck.length < 1) {
          deck = initialState.deck;
        }

        random = Math.floor(Math.random() * deck.length);
        card_number = deck[random][0];
        card_suit = deck[random][1];
        deck.splice(random, 1);
        card = [card_number, card_suit];

        if (i < 2) {
          player_cards.push(card);
          if (card_number === 11 || card_number === 12 || card_number === 13) {
            card_number = 10;
          }
          count += card_number;
        } else {
          dealer_cards.push(card);
          if (card_number === 11 || card_number === 12 || card_number === 13) {
            card_number = 10;
          } if (card_number === 1) {
            card_number = 11;
          }
          dealer_count += card_number;
        }
      }
      return _.assign({}, state, {deck: deck, player_cards: player_cards, dealer_cards: dealer_cards, count: count, 
        dealer_count: dealer_count, player_turn: true, busted: false, dealer_busted: false, bet_zero: false, 
        player_won: false, dealer_won: false, tie: tie});
    }
    case 'BUSTED': {
      return _.assign({}, state, {busted: false, bet: 0, player_turn: true});
    }
    case 'STAND':
      if (!state.player_turn || state.busted) {
        console.log("returning state");
        return state;
      }
      var temp_player_count = state.count;
      dealer_cards = state.dealer_cards;
      player_cards = state.player_cards;
      bet = state.bet;
      money = state.money;
      deck = state.deck;
      dealer_count = state.dealer_count;
      var dealer_won = state.dealer_won;
      var player_won = state.player_won;
      var tie = state.tie;


      while (dealer_count < 17) {
        //dealer draws a card
        //make sure deck isn't empty, if it is, reshuffle
        if (deck.length < 1) {
          deck = initialState.deck;
        }

        random = Math.floor(Math.random() * deck.length);
        card_number = deck[random][0];
        card_suit = deck[random][1];
        deck.splice(random, 1);

        //push card to dealer cards array
        card = [card_number, card_suit];
        dealer_cards.push(card);

        if (card_number === 11 || card_number === 12 || card_number === 13) {
          card_number = 10;
        } else if (card_number === 1) {
          card_number = 11;
        }
        //increment dealer count
        dealer_count += card_number;

        //check if dealer has busted
        if (dealer_count > 21) {
          dealer_busted = true;
        }
      }

      //calculate max player count with Ace's as 11
      for (i = 0; i < player_cards.length; i++) {
        if (player_cards[i][0] === 1 && (temp_player_count + 10) < 22) {
          temp_player_count += 10;
        }
      }
      if (dealer_busted) {
        money += (2 * bet);
        bet = 0;
        player_won = true;
      } else {
        if (dealer_count > temp_player_count) {
          bet = 0;
          dealer_won = true;
        } else if (dealer_count === temp_player_count) {
          money += bet;
          bet = 0;
          tie = true;
        } else {
          money += (2 * bet);
          bet = 0;
          player_won = true;
        }
      }
      return _.assign({}, state, {bet: bet, money: money, deck: deck, dealer_cards: dealer_cards, dealer_count: dealer_count, 
        dealer_busted: dealer_busted, dealer_turn: false, player_turn: false, dealer_won: dealer_won, player_won: player_won, tie: tie});
    default: {
      return state;
    }
  }
};

export { mainReducer }
