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
  switch(action.type) {
    case 'BET': {
      console.log("betting" + action.amount);
      //if you have enough money, bet the amount
      if (state.money > action.amount) {
        state.bet += action.amount;
        state.money -= action.amount;
      }
      console.log(state.money);
      break;
    }
    case 'RESET': {
      state.money += state.bet;
      state.bet = 0;
      break;
    }
    case 'HIT': {
      console.log("hit");
      //get new card number
      var card_number = getCard(state);

      //push card to player cards array
      state.player_cards.push(card_number);
      if (card_number === 11 || card_number === 12 || card_number === 13) {
        card_number = 10;
      }
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
      var temp_dealer_count = state.dealer_count;
      var temp_player_count = state.count;

      //calculate max dealer count with Ace's as 11
      for (var i = 0; i < state.dealer_cards.length; i++) {
        if (state.dealer_cards[i] === 1 && (temp_dealer_count + 10) < 22) {
          temp_dealer_count += 10;
        }
      }

      //calculate max player count with Ace's as 11
      for (i = 0; i < state.player_cards.length; i++) {
        if (state.cards[i] === 1 && (temp_player_count + 10) < 22) {
          temp_player_count += 10;
        }
      }

      if (temp_dealer_count > 16) {
        if (temp_dealer_count > temp_player_count) {
          state.bet = 0;
        } else if (temp_dealer_count === temp_player_count) {
          state.money += state.bet;
          state.bet = 0;
        } else {
          state.money += (2 * state.bet);
          state.bet = 0;
        }
      } else {
        //dealer draws a card
        card_number = getCard(state);
        state.dealer_cards.push(card_number);
        if (card_number === 11 || card_number === 12 || card_number === 13) {
          card_number = 10;
        }
        state.dealer_count += card_number;
        if (state.dealer_count > 21) {
          state.dealer_busted = true;
        }
      }
      break;
    case 'DEALER_BUSTED':
      state.player_turn = true;
      break;
    default: {
      return state;
    }
  }
  console.log("returning");
  return state;
};

export { mainReducer }
