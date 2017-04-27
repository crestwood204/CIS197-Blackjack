import React, { Component } from 'react';
import './styles/App.css';
import Card from './Card';

class App extends Component {
  render() {
    return (
      <div> 
        <div id="container">
        <p className="dealer">
          Dealer:
        </p>
        </div>
        <div className="dealer-one">
          <Card index={0}></Card>
        </div>
      </div>
  );
  }
}

export default App;
