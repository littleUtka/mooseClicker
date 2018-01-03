import React, { Component } from 'react';
import './App.css';
import moose from './moose.png';
import Progress from 'react-progressbar';
import Upgrades from './Upgrades.js';


class App extends Component {
  constructor(props) {
    super(props);
    

    this.mooseClickHandler = this.mooseClickHandler.bind(this);
    this.upgradeClickHandler = this.upgradeClickHandler.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("clicked") !== '') {
      this.setState({ clicked: +localStorage.getItem("clicked"), clickCounter: +localStorage.getItem("clickCounter") });
    }

    window.addEventListener("beforeunload", (ev) => {
      localStorage.setItem("clicked", this.state.clicked);
      localStorage.setItem("clickCounter", this.state.clickCounter);
    });
  }

  mooseClickHandler() {
    this.setState({ clicked: this.state.clicked + this.state.clickCounter });
  }

  upgradeClickHandler(minMooseForUpgrade, incrClick) {
    console.log(minMooseForUpgrade, incrClick);

    if (this.state.clicked >= minMooseForUpgrade) {
      this.setState({
        clicked: this.state.clicked - minMooseForUpgrade,
        clickCounter: this.state.clickCounter + incrClick
      });
      // localStorage.setItem('clickCounter', this.state.clickCounter, 'clicked', this.state.clicked - this.state.hornsMin);
    }
  }


  render() {
    return (
      <div className="App">
        <div className="Moose">
          <img src={moose} onClick={this.mooseClickHandler} alt="moose" />
        </div>
        
          <Upgrades />
          {/* <div className="upgrade" onClick={this.upgradeClickHandler.bind(this, this.state.hornsMin, 1)}>
            <progress value={(this.state.clicked / this.state.hornsMin) * 100} max="100" />
            Рога({this.state.hornsMin})
          </div>
          <div className="upgrade" onClick={this.upgradeClickHandler.bind(this, this.state.bloomMin, 2)}>
            <progress value={(this.state.clicked / this.state.bloomMin) * 100} max="100" />
            Шерсть({this.state.bloomMin})
          </div>
          <div className="upgrade" onClick={this.upgradeClickHandler.bind(this, this.state.sleighMin, 3)}>
            <progress value={(this.state.clicked / this.state.sleighMin) * 100} max="100" />
            Санки({this.state.sleighMin})
          </div>
          <div className="upgrade" onClick={this.upgradeClickHandler.bind(this, this.state.scooterMin, 4)}>
            <progress value={(this.state.clicked / this.state.scooterMin) * 100} max="100" />
            Скутер({this.state.scooterMin})
          </div> */}
        
        <div className="scoreboard">
          Лосиков: {this.state.clicked}
        </div>

      </div>
    );
  }
}

export default App;




