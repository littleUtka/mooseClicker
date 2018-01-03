import React, { Component } from 'react';
import './App.css';
import moose from './moose.png';
import Progress from 'react-progressbar';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
      clickCounter: 1,
      hornsMin: 10,
      bloomMin: 300,
      sleighMin: 2000,
      scooterMin: 10000
    }

    this.MooseClickHandler = this.MooseClickHandler.bind(this);
    this.UpgradeClickHandler = this.UpgradeClickHandler.bind(this);
  }
  componentWillMount() {
    if (localStorage.getItem("clicked") !== '') {
      this.setState({ clicked: localStorage.getItem("clicked") * 1, clickCounter:  localStorage.getItem("clickCounter") * 1});
    }

    window.addEventListener("beforeunload", (ev) => {
      localStorage.setItem("clicked", this.state.clicked);
      localStorage.setItem("clickCounter", this.state.clickCounter);
      // ev.preventDefault();
      // return ev.returnValue = 'Are you sure you want to close?';
    });
  }




  MooseClickHandler() {
    
    this.setState({ clicked: this.state.clicked + this.state.clickCounter });

    // localStorage.setItem('clicked', this.state.clicked + 1);

  }

  UpgradeClickHandler(incrCounterClick) {
    if (incrCounterClick === 1) {
      if (this.state.clicked >= this.state.hornsMin) {
        this.setState({
          clicked: this.state.clicked - this.state.hornsMin,
          clickCounter: this.state.clickCounter + 1
        });
        // localStorage.setItem('clickCounter', this.state.clickCounter, 'clicked', this.state.clicked - this.state.hornsMin);
      }
    }

    if (incrCounterClick === 2) {
      if (this.state.clicked >= this.state.bloomMin) {
        this.setState({
          clicked: this.state.clicked - this.state.bloomMin,
          clickCounter: this.state.clickCounter + 2
        });
        // localStorage.setItem('clickCounter', this.state.clickCounter, 'clicked', this.state.clicked);
      }
    }

    if (incrCounterClick === 3) {
      if (this.state.clicked >= this.state.sleighMin) {
        this.setState({
          clicked: this.state.clicked - this.state.sleighMin,
          clickCounter: this.state.clickCounter + 3
        });
        // localStorage.setItem('clickCounter', this.state.clickCounter, 'clicked', this.state.clicked);
      }
    }

    if (incrCounterClick === 4) {
      if (this.state.clicked >= this.state.scooterMin) {
        this.setState({
          clicked: this.state.clicked - this.state.scooterMin,
          clickCounter: this.state.clickCounter + 4
        });
        // localStorage.setItem('clickCounter', this.state.clickCounter, 'clicked', this.state.clicked);
        alert('grats!')
      }
    }
  }

  render() {
    return (
      <div className="App">

        <div className="Moose">
          <img src={moose} onClick={this.MooseClickHandler} alt="moose" />
        </div>
        <div className="menu">
          <div className="upgrade" onClick={this.UpgradeClickHandler.bind(this, 1)}>
          <progress value={(this.state.clicked / this.state.hornsMin) * 100} max="100" />
            Рога({this.state.hornsMin})
          </div>
          <div className="upgrade" onClick={this.UpgradeClickHandler.bind(this, 2)}>
          <progress value={(this.state.clicked / this.state.bloomMin) * 100} max="100" />
            Шерсть({this.state.bloomMin})
          </div>
          <div className="upgrade" onClick={this.UpgradeClickHandler.bind(this, 3)}>
          <progress value={(this.state.clicked / this.state.sleighMin) * 100} max="100" />
            Санки({this.state.sleighMin})
          </div>
          <div className="upgrade" onClick={this.UpgradeClickHandler.bind(this, 4)}>
          <progress value={(this.state.clicked / this.state.scooterMin) * 100} max="100" />
            Скутер({this.state.scooterMin})
          </div>
          <div>
        
      </div>
          
        </div>
        <div className="Scoreboard">
          Лосиков: {this.state.clicked}
        </div>

      </div>
    );
  }
}

export default App;




