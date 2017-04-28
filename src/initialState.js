const player_cards = [];

const dealer_cards = [];

const deck = [];
for (var i = 1; i < 14; i++) {
  for (var j = 0; j < 4; j++) {
    const card = [i, j];
    deck.push(card);
  }
}

//1: Ace
//11: Jack
//12: Queen
//13: King

//set initial cards
const get_card = function () {
  var random = Math.round(Math.random() * deck.length);
  var card_number = deck[random];
  deck.splice(random, 1);
  return card_number;
}


const money = 1000;
const bet = 0;
const busted = false;
const count = 0;
const player_turn = false;
const dealer_count = 0;
const dealer_busted = false;
const bet_zero = true;
const player_won = false;
const dealer_won = false;
const tie = false;


export { player_cards, dealer_cards, deck, money, bet, busted, count, player_turn, dealer_count, dealer_busted, bet_zero, player_won, dealer_won, tie };