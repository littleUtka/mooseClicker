import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progressbar';
import Upgrades from './Upgrades.js';
import Achievements from './Achievements.js';


class App extends Component {
  constructor(props) {
    super(props);
  }

  onKeyPressed(e) {
    // if (e.key === "Control") {

    // }
  }

  render() {

    return (
      <div className="App" onKeyDown={(e) => this.onKeyPressed(e)} tabIndex="0" >

        <Upgrades />
        <Achievements />
        </div>
        );
  }
}

export default App;









