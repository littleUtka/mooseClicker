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
                    <div className="Moose">
                        <img src={moose} onClick={this.mooseClickHandler} alt="moose" />
                    </div>
                    {upgrades.map((num, index) => {

                        num.name[2] !== "" ? dpsText = num.name[2] + " DPS" : dpsText = ""; 
                     
                        if (this.state.upgrades[index] === 0) {
                            this.state.upgrades[index] = num.name[1];
                        } // Проверк, что первоначальные данные взяты всего один раз

                        (this.state.clicked / this.state.upgrades[index]) >= 1 ? this.state.availableUpgrade = true : this.state.availableUpgrade = false; // Проверка на цвет 
                         

                        return (
                            <div className={this.state.availableUpgrade ? "upgradeLight" : "upgradeDark"} key={index + 1} id={index + 1}>
                                <div className="upgrade-text">
                                    {num.name[0]}<br />+{index + 1} per click<br />{dpsText}
                                </div>
                                <div className="button-upgrade">
                                    <button className="megaUpgrade1" onClick={this.upgradeClickHandler.bind(this, index, num.name[2], this.state.upgrades[index], 1)}>
                                        x1({this.returnMoose(this.state.upgrades[index])})
                                    </button>
                                    <button className="megaUpgrade10" onClick={this.upgradeClickHandler.bind(this, index, +num.name[2], +this.state.upgrades[index] * 10, 10)}>
                                        x10({this.returnMoose(this.state.upgrades[index] * 10)})
                                    </button>
                                    <button className="megaUpgrade100" onClick={this.upgradeClickHandler.bind(this, index, +num.name[2], +this.state.upgrades[index] * 100, 100)}>
                                        x100({this.returnMoose(this.state.upgrades[index] * 100)})
                                    </button>
                                </div>
                                <progress value={(this.state.clicked / this.state.upgrades[index]) * 100} max="100" />
                            </div>
                        )
                    })
                    }

                    
                    <div className="scoreboard">
                        Лосиков: {this.returnMoose(this.state.clicked)}<br />PC: {this.returnMoose(this.state.clickCounter)}<br />DPS: {this.returnMoose(this.state.dps)}
                    </div>
                </div>



            );
        }

    }
}