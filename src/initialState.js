const player_cards = [null, null];

const dealer_cards = [null, null];

const deck = [];
for (var i = 1; i < 14; i++) {
  for (var j = 0; j < 4; j++) {
    deck.push(i);
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

player_cards[0] = get_card();
player_cards[1] = get_card();

dealer_cards[0] = get_card();
dealer_cards[1] = get_card();

const money = 1000;
const bet = 0;
const busted = false;
const count = 0;
const player_turn = true;
const dealer_count = 0;
const dealer_busted = false;


export { player_cards, dealer_cards, deck, money, bet, busted, count, player_turn, dealer_count, dealer_busted };