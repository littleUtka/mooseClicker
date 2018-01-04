import React, { Component } from 'react';
import './App.css';
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
            scooterMin: config.scooterMin,
            availableUpgrade: true
        }
        this.mooseClickHandler = this.mooseClickHandler.bind(this);
        this.upgradeClickHandler = this.upgradeClickHandler.bind(this);

    }

    componentWillMount() {
        if (localStorage.getItem("clicked") !== null) {
            this.setState({ clicked: +localStorage.getItem("clicked"), clickCounter: +localStorage.getItem("clickCounter") });
        } else {
            this.setState({ clicked: +0, clickCounter: +1 });
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
                <div className="menu">
                    <div className="Moose">
                        <img src={moose} onClick={this.mooseClickHandler} alt="moose" />
                    </div>
                    {upgrades.map((num, index) => {
                        
                        if ((this.state.clicked / num.mooseMin) >= 1) {
                            this.state.availableUpgrade = true;
                        } else {
                            this.state.availableUpgrade = false;
                        }
                        
                        return (
                            <div className={this.state.availableUpgrade ? "upgradeLight" : "upgradeDark"} key={index + 1} id={index + 1} onClick={this.upgradeClickHandler.bind(this, num.mooseMin, index + 1)}>
                                <progress value={(this.state.clicked / num.mooseMin) * 100} max="100" id={index + 1 + 'p'}>123</progress>
                                <div className="upgrade-text">
                                    {num.name}({num.mooseMin})
                                </div>
                            </div>
                        )
                    })
                    }
                    <div className="scoreboard">
                        Лосиков: {this.state.clicked}
                    </div>
                </div>



            );
        }

    }
}