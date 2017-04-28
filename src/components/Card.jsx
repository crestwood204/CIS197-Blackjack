
import React from 'react';

export default class Card extends React.Component {

  constructor () {
    super();
  }

  render() {
    if (this.props.hidden) {
      return ( <span className="card">🂠</span>);
    } else {
      switch (this.props.number) {
        case 1:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂡</span>);
            case 1:
              return ( <span className="card">🂱</span>);
            case 2:
              return ( <span className="card">🃁</span>);
            case 3:
              return ( <span className="card">🃑</span>);
            default:
              return ( <span className="card">A</span>);
          }
        case 2:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂢</span>);
            case 1:
              return ( <span className="card">🂲</span>);
            case 2:
              return ( <span className="card">🃂</span>);
            case 3:
              return ( <span className="card">🃒</span>);
            default:
              return ( <span className="card">2</span>);
          }
        case 3:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂣</span>);
            case 1:
              return ( <span className="card">🂳</span>);
            case 2:
              return ( <span className="card">🃃</span>);
            case 3:
              return ( <span className="card">🃓</span>);
            default:
              return ( <span className="card">3</span>);
          }
        case 4:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂤</span>);
            case 1:
              return ( <span className="card">🂴</span>);
            case 2:
              return ( <span className="card">🃄</span>);
            case 3:
              return ( <span className="card">🃔</span>);
            default:
              return ( <span className="card">4</span>);
          }
        case 5:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂥</span>);
            case 1:
              return ( <span className="card">🂵</span>);
            case 2:
              return ( <span className="card">🃅</span>);
            case 3:
              return ( <span className="card">🃕</span>);
            default:
              return ( <span className="card">5</span>);
          }
        case 6:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂦</span>);
            case 1:
              return ( <span className="card">🂶</span>);
            case 2:
              return ( <span className="card">🃆</span>);
            case 3:
              return ( <span className="card">🃖</span>);
            default:
              return ( <span className="card">6</span>);
          }
        case 7:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂧</span>);
            case 1:
              return ( <span className="card">🂷</span>);
            case 2:
              return ( <span className="card">🃇</span>);
            case 3:
              return ( <span className="card">🃗</span>);
            default:
              return ( <span className="card">7</span>);
          }
        case 8:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂨</span>);
            case 1:
              return ( <span className="card">🂸</span>);
            case 2:
              return ( <span className="card">🃈</span>);
            case 3:
              return ( <span className="card">🃘</span>);
            default:
              return ( <span className="card">8</span>);
          }
        case 9:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂩</span>);
            case 1:
              return ( <span className="card">🂹</span>);
            case 2:
              return ( <span className="card">🃉</span>);
            case 3:
              return ( <span className="card">🃙</span>);
            default:
              return ( <span className="card">9</span>);
          }
        case 10:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂪</span>);
            case 1:
              return ( <span className="card">🂺</span>);
            case 2:
              return ( <span className="card">🃊</span>);
            case 3:
              return ( <span className="card">🃚</span>);
            default:
              return ( <span className="card">10</span>);
          }
        case 11:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂫</span>);
            case 1:
              return ( <span className="card">🂻</span>);
            case 2:
              return ( <span className="card">🃋</span>);
            case 3:
              return ( <span className="card">🃛</span>);
            default:
              return ( <span className="card">J</span>);
          }
        case 12:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂭</span>);
            case 1:
              return ( <span className="card">🂽</span>);
            case 2:
              return ( <span className="card">🃍</span>);
            case 3:
              return ( <span className="card">🃝</span>);
            default:
              return ( <span className="card">Q</span>);
          }
        case 13:
          switch (this.props.suit) {
            case 0:
              return ( <span className="card">🂮</span>);
            case 1:
              return ( <span className="card">🂾</span>);
            case 2:
              return ( <span className="card">🃎</span>);
            case 3:
              return ( <span className="card">🃞</span>);
            default:
              return ( <span className="card">K</span>);
          }
        default:
          return ( <span className="card">{this.props.number}</span>);
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
  number: 0,
  suit: 0
}