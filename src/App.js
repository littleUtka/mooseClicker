import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progressbar';
import Upgrades from './Upgrades.js';


class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
          <Upgrades />
      </div>
    );
  }
}

export default App;









