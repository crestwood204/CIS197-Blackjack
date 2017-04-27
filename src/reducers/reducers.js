import * as initialState from '../initialState.js';

var getCard = function getCard(state) {
  //if deck is empty, reshuffle
  if (state.deck.length < 1) {
    state.deck = initialState.deck;
  }


  var random = Math.round(Math.random() * state.deck.length);
  var card_number = state.deck[random];
  state.deck.splice(random, 1);
  return card_number;
}

var mainReducer = function mainReducer(state, action) {
  if (state.player_turn) {
    switch(action.type) {
      case 'BET': {
        //if you have enough money, bet the amount
        if (state.money > action.amount) {
          state.bet += action.amount;
        }
        break;
      }
      case 'RESET': {
        state.money += state.bet;
        state.bet = 0;
        break;
      }
      case 'HIT': {
        //get new card number
        var card_number = getCard(state);

        //push card to player cards array
        state.player_cards.push(card_number);

        //increment player count
        state.count += card_number;

        //check if player has busted
        if (state.count > 21) {
          state.busted = true;
        }
        break;
      }
      case 'STAND': {
        state.player_turn = false;
        break;
      }
      case 'DEAL': {
        state.player_cards = [getCard(state), getCard(state)];
        state.dealer_cards = [getCard(state), getCard(state)];
        break;
      }
      case 'BUSTED': {
        state.busted = false;
        state.bet = 0;
        state.player_turn = true;
        break;
      }
      case 'DEALER_TURN':
        if (state.dealer_count > 16) {
          if (state.dealer_count > state.count) {
            state.bet = 0;
          } else if (state.dealer_count === state.count) {
            state.money += state.bet;
            state.bet = 0;
          } else {
            state.money += (2 * state.bet);
            state.bet = 0;
          }
        } else {
          //dealer draws a card
          var card_number = getCard(state);
          state.dealer_cards.push(card_number);
          state.dealer_count += card_number;
          if (state.dealer_count > 21) {
            state.dealer_busted = true;
          }
          break;
        }
      case 'DEALER_BUSTED':
        state.player_turn = true;
        break;
      default: {
        return;
      }
    }
  }
};

export { mainReducer }