
import React from 'react';

export default class Card extends React.Component {

  constructor () {
    super();
  }

  render() {
    if (this.props.hidden) {
      return ( <span className="card-back"> </span>);
    } else {
      switch (this.props.number) {
        case 1:
          return ( <span className="card"> <p> A </p> </span>);
        case 11:
          return ( <span className="card"> <p> J </p> </span>);
        case 12:
          return ( <span className="card"> <p> Q </p> </span>);
        case 13:
          return ( <span className="card"> <p> K </p> </span>);
        default:
          return ( <span className="card"> <p> {this.props.number} </p> </span>);
      }
    }
  }
}
//this.props.number

Card.propTypes = {
  index: React.PropTypes.number.isRequired,
  hidden: React.PropTypes.bool.isRequired
};

Card.defaultProps = {
  number: 0
}