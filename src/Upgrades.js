import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progressbar';
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

        // this.upgradeClickHandler = this.upgradeClickHandler.bind(this);
        this.clicked1 = this.clicked1.bind(this);
    }

    // upgradeClickHandler(minMooseForUpgrade, incrClick) {
    //     console.log(minMooseForUpgrade, incrClick);

    //     if (this.state.clicked >= minMooseForUpgrade) {
    //         this.setState({
    //             clicked: this.state.clicked - minMooseForUpgrade,
    //             clickCounter: this.state.clickCounter + incrClick
    //         });
    //         // localStorage.setItem('clickCounter', this.state.clickCounter, 'clicked', this.state.clicked - this.state.hornsMin);
    //     }
    // }

    clicked1() {
        console.log('1111');
    }

    render() {
        {

            return (
                <div className="menu">
                    {upgrades.map(function (num, index) {
                        return (
                            <div className="upgrade" key={index + 1} onClick={(e) => this.clicked1}>{num.name}({num.mooseMin})</div>
                        )
                    })
                    }
                </div>
            );
        }

    }
}