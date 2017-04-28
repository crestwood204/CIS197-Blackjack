import Blackjack from './Blackjack';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return  { state }
}

let BlackjackWrapper = connect(mapStateToProps)(Blackjack);

export default BlackjackWrapper;
