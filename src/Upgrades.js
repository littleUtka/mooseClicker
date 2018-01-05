import React, { Component } from 'react';
import './App.css';
import moose from './moose.png';
var upgrades = require('./upgradesConfig.json');
var config = require('./config.json');


export default class Upgrades extends Component {
    constructor(props) {
        super(props);

        this.state = {
            upgrades: [0, 0, 0, 0, 0],
            availableUpgrade: false,
            dps: config.dps,
            clicked: 0,
            clickCounter: 1,
            totalUpgrades: 0
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

        window.addEventListener("beforeunload", (ev) => {
           
            localStorage.setItem("params", '{"clicked":' + this.state.clicked + ',"clickCounter":' + this.state.clickCounter + ',"dps":' + this.state.dps +
                ',"hornsMin":' + this.state.upgrades[0] + ',"bloomMin":' + this.state.upgrades[1] + ',"sleighMin":' + this.state.upgrades[2] + ',"scooterMin":' +
                this.state.upgrades[3] + ',"rocketMin":' + this.state.upgrades[4] + '}')

        });
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
                clickCounter: this.state.clickCounter + (incrClick+1) * multiplier,
                dps: this.state.dps + +dpsUpgrade * multiplier,
                upgrades: arrayUpgrage
            });

        }
    }

    mooseClickHandler() {

        this.setState({ clicked: this.state.clicked + this.state.clickCounter });

    }

    returnMoose(mooseConv) {
        
        if (mooseConv < Math.pow(10, 3)) {
            return(mooseConv);
         } else if ((mooseConv >= Math.pow(10, 3)) && (mooseConv < Math.pow(10, 6))) {
            return((mooseConv / Math.pow(10, 3)).toFixed(2) + 'K'); 
         } else {
            return((mooseConv / Math.pow(10, 6)).toFixed(2) + 'М'); 
         }
       
    }


    render() {
        {
            var dpsText = '';
            return (
                <div className="menu">
                    Zaebalo
                </div>



            );
        }

    }
}