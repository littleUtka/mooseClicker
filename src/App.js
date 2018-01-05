import React, { Component } from 'react';
import './App.css';
import Upgrades from './Upgrades.js';
import Achievements from './Achievements.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: 0,
      clickCounter: 1,
      dps: 0,
      upgrades: [0, 0, 0, 0, 0],
      buttonUpgrade: [1, 10, 100]
    }

    this.mooseClickHandler = this.mooseClickHandler.bind(this);
    this.upgradeClickHandler = this.upgradeClickHandler.bind(this);
  }

  componentWillMount() {

    if (localStorage.getItem("params") !== null) {

      let storageJSON = JSON.parse(localStorage.getItem("params"));
      let newUpgrades = [storageJSON["hornsMin"], storageJSON["bloomMin"], storageJSON["sleighMin"], storageJSON["scooterMin"], storageJSON["rocketMin"]];
      this.setState({ clicked: +storageJSON["clicked"], clickCounter: +storageJSON["clickCounter"], dps: +storageJSON["dps"], upgrades: newUpgrades });
    } else {
      this.setState({ clicked: 0, clickCounter: 1, dps: 0 });
    }

    setInterval(() => {
      this.setState({ clicked: this.state.clicked + this.state.dps });
    }, 1000);

    // window.addEventListener("beforeunload", (ev) => {

    //     localStorage.setItem("params", '{"clicked":' + this.state.clicked + ',"clickCounter":' + this.state.clickCounter + ',"dps":' + this.state.dps +
    //         ',"hornsMin":' + this.state.upgrades[0] + ',"bloomMin":' + this.state.upgrades[1] + ',"sleighMin":' + this.state.upgrades[2] + ',"scooterMin":' +
    //         this.state.upgrades[3] + ',"rocketMin":' + this.state.upgrades[4] + '}')

    // });
  }

  onKeyPressed(e) {
    // if (e.key === "Control") {

    // }
  }

  mooseClickHandler() {
    this.setState({ clicked: this.state.clicked + this.state.clickCounter });


  }

  upgradeClickHandler(incrClick, dpsUpgrade, minUpgrade, multiplier) {

    if (this.state.clicked >= minUpgrade) {
      let arrayUpgrage = this.state.upgrades;
      // console.log(arrayUpgrage);
      let oldClicked = arrayUpgrage[incrClick] * multiplier;
      // console.log(oldClicked);
      arrayUpgrage[incrClick] = (arrayUpgrage[incrClick] * Math.pow(1.25, multiplier)).toFixed(0);
      // console.log(arrayUpgrage);
      this.setState({
        clicked: this.state.clicked - oldClicked,
        clickCounter: this.state.clickCounter + (incrClick + 1) * multiplier,
        dps: this.state.dps + +dpsUpgrade * multiplier,
        upgrades: arrayUpgrage
      });

    }
  }

  render() {

    return (
      <div className="App" onKeyDown={(e) => this.onKeyPressed(e)} tabIndex="0" >

        <Upgrades handleMooseClick={this.mooseClickHandler} appState={this.state} handleUpgradeClick={this.upgradeClickHandler} />
        <Achievements mooseClicked={this.state.clicked} />
      </div>
    );
  }
}

export default App;









