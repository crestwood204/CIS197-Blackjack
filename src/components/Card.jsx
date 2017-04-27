
import React from 'react';

export default class Card extends React.Component {

  constructor () {
    super();
  }

  render() {
    if (this.props.hidden) {
      return ( <span className="card"> <p> {this.props.number} </p> </span>);
    } else {
      return ( <span className="card-back"> </span>);
    }
  }
}
//this.props.number

Card.propTypes = {
  store: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  hidden: React.PropTypes.bool.isRequired
};

Card.defaultProps = {
  number: 0
}