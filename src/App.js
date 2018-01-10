import React, { Component } from 'react';
import './App.css';
import Upgrades from './Upgrades.js';
import Achievements from './Achievements.js';
import moose from './fish.png';
import mooseGold from './money.png';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fishClicked: 0,
      moneyWallet: 0,
      fishFlag: false, //Флаг добычи(бизнеса). Изначально добыча.
      clickCounter: 1,
      moneyCounter: 1,
      fishDPS: 0,
      moneyDPS: 0,
      upgrades: [0, 0, 0, 0, 0],
      business: [0, 0, 0, 0, 0],
      buttonUpgrade: [1, 10, 100],
      mooseSrc: '',
      clickMultiplier: 1
    }

    this.mooseClickHandler = this.mooseClickHandler.bind(this);
    this.upgradeClickHandler = this.upgradeClickHandler.bind(this);
    this.handleFishFlagChanger = this.handleFishFlagChanger.bind(this);
  }

  componentWillMount() {

    // if (localStorage.getItem("params") !== null) {

    //   let storageJSON = JSON.parse(localStorage.getItem("params"));
    //   let newUpgrades = [storageJSON["hornsMin"], storageJSON["bloomMin"], storageJSON["sleighMin"], storageJSON["scooterMin"], storageJSON["rocketMin"]];

    //   this.setState({ clicked: +storageJSON["clicked"], clickCounter: +storageJSON["clickCounter"], dps: +storageJSON["dps"], upgrades: newUpgrades });
    // } else {

    //   this.setState({ clicked: 0, clickCounter: 1, dps: 0 });

    // }

    setInterval(() => {
      this.state.fishClicked + this.state.fishDPS - this.state.moneyDPS >= 0 ?
      this.setState({ 
        fishClicked: this.state.fishClicked + this.state.fishDPS - this.state.moneyDPS, 
        moneyWallet: this.state.moneyWallet + this.state.moneyDPS
      }) 
      :
      this.setState({
        fishClicked: 0,
        moneyWallet: this.state.moneyWallet + this.state.fishClicked
      }) 
    }, 1000);

    // window.addEventListener("beforeunload", (ev) => {

    //   localStorage.setItem("params", '{"clicked":' + this.state.clicked + ',"clickCounter":' + this.state.clickCounter + ',"dps":' + this.state.dps +
    //   ',"hornsMin":' + this.state.upgrades[0] + ',"bloomMin":' + this.state.upgrades[1] + ',"sleighMin":' + this.state.upgrades[2] + ',"scooterMin":' +
    //   this.state.upgrades[3] + ',"rocketMin":' + this.state.upgrades[4] + '}')

    // });


    this.setState({ mooseSrc: moose });
    // let goldenMooseTimeOut = (Math.floor(Math.random() * 67) + 1) * 1000;

    // setTimeout(() => {
    //   this.handlerGoldenMoose();
    // }, goldenMooseTimeOut);

  }

  handlerGoldenMoose() {
    this.setState({
      mooseSrc: mooseGold,
      clickMultiplier: 10
    });

    setTimeout(() => {
      this.setState({
        mooseSrc: moose,
        clickMultiplier: 1
      })
    }, 10000);
  }

  handleFishFlagChanger(flagStatus) {

    flagStatus ?
      this.setState({
        fishFlag: true,
        mooseSrc: mooseGold
      })
      :
      this.setState({
        fishFlag: false,
        mooseSrc: moose
      });

  }



  mooseClickHandler() {
    this.state.fishFlag ? (this.state.fishClicked - this.state.moneyCounter >= 0 ? this.setState({
      fishClicked: this.state.fishClicked - this.state.moneyCounter,
      moneyWallet: this.state.moneyWallet + this.state.moneyCounter
    })
      :
      this.setState({
        fishClicked: 0,
        moneyWallet: this.state.moneyWallet + this.state.fishClicked
      }))
      :  // * this.state.clickMultiplier
      this.setState({
        fishClicked: this.state.fishClicked + this.state.clickCounter
      });

    // this.setState({ fishClicked: this.state.fishClicked + this.state.clickCounter * this.state.clickMultiplier });
      
  }

  upgradeClickHandler(arrayIndex, dpsUpgrade, minUpgrade, multiplier, clickIncrease) {


    if (this.state.moneyWallet >= minUpgrade) {
      let arrayUpgrage = [];
      this.state.fishFlag ? arrayUpgrage = this.state.upgrades : arrayUpgrage = this.state.business;
      let oldClicked = arrayUpgrage[arrayIndex] * multiplier;
      arrayUpgrage[arrayIndex] = (arrayUpgrage[arrayIndex] * Math.pow(1.25, multiplier)).toFixed(0);
      
      this.state.fishFlag ? 
      this.setState({
        moneyWallet: this.state.moneyWallet - oldClicked,
        upgrades: arrayUpgrage,
        moneyCounter: this.state.moneyCounter + (clickIncrease) * multiplier,
        moneyDPS: this.state.moneyDPS + +dpsUpgrade * multiplier
      }) 
      : 
      this.setState({
        moneyWallet: this.state.moneyWallet - oldClicked,
        clickCounter: this.state.clickCounter + (clickIncrease) * multiplier,
        business: arrayUpgrage,
        fishDPS: this.state.fishDPS + +dpsUpgrade * multiplier
      })
    }
  }

  render() {

    return (
      <div className="App">
        <Upgrades handleMooseClick={this.mooseClickHandler} appState={this.state} handleUpgradeClick={this.upgradeClickHandler} handleFishFlagChanger={this.handleFishFlagChanger} />
        <Achievements mooseClicked={this.state.fishClicked} />
      </div>
    );
  }
}

export default App;









