import React, { Component } from 'react';
import './App.css';
import moose from './moose.png';
var upgrades = require('./upgradesConfig.json');


export default class Upgrades extends Component {

    returnMoose(mooseConv) {

        if (mooseConv < Math.pow(10, 3)) {
            return (mooseConv);
        } else if ((mooseConv >= Math.pow(10, 3)) && (mooseConv < Math.pow(10, 6))) {
            return ((mooseConv / Math.pow(10, 3)).toFixed(2) + 'K');
        } else {
            return ((mooseConv / Math.pow(10, 6)).toFixed(2) + 'М');
        }

    }

    returnButtonColor(totalClicked, minMoose) {

        let butonColor = totalClicked >= minMoose ? "#86C9CB" : "#A58686";
        return (butonColor);

    }

    render() {

        var dpsText = '';
        return (
            <div className="menu">
                <div className="Moose">
                    <img src={moose} onClick={(e) => {

                        this.props.handleMooseClick();

                    }} alt="moose" />
                </div>
                {upgrades.map((num, index) => {

                    num.name[2] !== "" ? dpsText = num.name[2] + " DPS" : dpsText = "";

                    if (this.props.appState.upgrades[index] === 0) {
                        this.props.appState.upgrades[index] = num.name[1];
                    } // Проверка, что первоначальные данные взяты всего один раз
                    
                    let availableUpgrade = this.props.appState.clicked >= this.props.appState.upgrades[index];

                    return (
                        <div className={availableUpgrade ? "upgradeLight" : "upgradeDark"} key={index + 1}>
                            <div className="upgrade-text">
                                {num.name[0]}<br />+{index + 1} per click<br />{dpsText}
                            </div>
                            <div className="button-upgrade">
                                {this.props.appState.buttonUpgrade.map((buttonUpg, buttonIndex) => {
                                    return (

                                        <button className={"x" + buttonUpg} style={{ "backgroundColor": this.returnButtonColor(this.props.appState.clicked, this.props.appState.upgrades[index] * buttonUpg) }} onClick={(e) => this.props.handleUpgradeClick(index, num.name[2], this.props.appState.upgrades[index], buttonUpg)} key={buttonIndex}>
                                            {"x" + buttonUpg}({this.returnMoose(this.props.appState.upgrades[index] * buttonUpg)})
                                            </button>
                                    )
                                }
                                )}
                            </div>
                            <progress value={(this.props.appState.clicked / this.props.appState.upgrades[index]) * 100} max="100" />
                        </div>
                    )

                })
                }
                <div className="scoreboard">
                    Лосиков: {this.returnMoose(this.props.appState.clicked)}<br />PC: {this.returnMoose(this.props.appState.clickCounter)}<br />DPS: {this.returnMoose(this.props.appState.dps)}
                </div>
            </div>
        );

    }
}