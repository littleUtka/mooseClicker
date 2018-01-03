import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progressbar';
import moose from './moose.png';
var upgrades = require('./upgradesConfig.json');
var config = require('./config.json');


export default class Upgrades extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: config.clicked,
            clickCounter: config.clickCounter,
            totalUpgrades: config.totalUpgrades,
            hornsMin: config.hornsMin,
            bloomMin: config.bloomMin,
            sleighMin: config.sleighMin,
            scooterMin: config.scooterMin
        }
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

    upgradeClickHandler(minMooseForUpgrade, incrClick) {

        if (this.state.clicked >= minMooseForUpgrade) {
            this.setState({
                clicked: this.state.clicked - minMooseForUpgrade,
                clickCounter: this.state.clickCounter + incrClick
            });
        }
    }

    mooseClickHandler() {

        this.setState({ clicked: this.state.clicked + this.state.clickCounter });
        
    }


    render() {
        {

            return (
                <div>
                    <div className="Moose">
                        <img src={moose} onClick={this.mooseClickHandler} alt="moose" />
                    </div>
                    <div className="menu">
                        {upgrades.map((num, index) => {
                            return (
                                <div className="upgrade" id={index + 1} onClick={this.upgradeClickHandler.bind(this, num.mooseMin, index + 1)}>
                                <progress value={(this.state.clicked / num.mooseMin) * 100} max="100" id={index + 1 + 'p'}>123</progress>
                                {num.name}({num.mooseMin})
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className="scoreboard">
                        Лосиков: {this.state.clicked}
                    </div>
                </div>

            );
        }

    }
}