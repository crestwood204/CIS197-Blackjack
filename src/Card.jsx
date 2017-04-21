
import React from 'react';

export default class Card extends React.Component {

  render() {
    if (!this.suit) {
        return <span className="empty-card"></span>
    } else {
      console.log(this.suit);
        return (
          <span className="empty-card">
            <div>
              {this.number}
              </div>
            <br />
            <p> of </p>
            {this.suit}
          </span>
        );
    }
  }
}

Card.propTypes = {
  //store: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
};