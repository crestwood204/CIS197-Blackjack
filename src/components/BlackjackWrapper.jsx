import Blackjack from './Blackjack';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return  { state }
}

let BlackjackWrapper = connect(mapStateToProps, null)(Blackjack);

export default BlackjackWrapper;
