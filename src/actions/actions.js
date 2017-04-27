//making a bet
const bet = (amount) => {
  return {
    type: 'BET',
    amount: amount
  };
};

//reseting your bet to 0
const reset = () => {
  return {
    type: 'RESET'
  };
};

//getting a new card
const hit = () => {
  return {
    type: 'HIT'
  };
};

//dealer's turn
const stand = () => {
  return {
    type: 'STAND'
  };
};

//deal the cards
const deal = () => {
  return {
    type: 'DEAL'
  };
};

//busted
const busted = () => {
  return {
    type: 'BUSTED'
  };
};

//make move for dealer
const dealerTurn = () => {
  return {
    type: 'DEALER_TURN'
  };
};

//dealer busted
const dealerBusted = () => {
  return {
    type: 'DEALER_BUSTED'
  };
};

export { bet, reset, hit, stand, deal, busted, dealerTurn, dealerBusted};