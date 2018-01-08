import React, { Component } from 'react';
import './App.css';
var upgrades = require('./upgradesConfig.json');
var business = require('./businessConfig.json');


export default class Upgrades extends Component {
    constructor() {
        super();
        this.state = {
            upgradeFlag: true
        }
    }

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

    returnUpgradesMoose(upgradeKind, upgradeInfo, upgradeCount) {
        
        var dpsText = '';
        return (upgradeKind.map((num, index) => {

            num.name[2] !== "" ? dpsText = num.name[2] + " DPS" : dpsText = "";

            if (upgradeCount === 1) {
                if (this.props.appState.upgrades[index] === 0) {
                    this.props.appState.upgrades[index] = num.name[1];
                } // Проверка, что первоначальные данные взяты всего один раз
            } else {
                if (this.props.appState.business[index] === 0) {
                    this.props.appState.business[index] = num.name[1];
                } // Проверка, что первоначальные данные взяты всего один раз    
            }
            
            let availableUpgrade = this.props.appState.clicked >= upgradeInfo[index];
            // console.log(upgradeInfo[index]);
            return (
                <div className={availableUpgrade ? "upgradeLight" : "upgradeDark"} key={index + 1}>
                    <div className="upgrade-text">
                        {num.name[0]}<br />+{index + 1} per click<br />{dpsText}
                    </div>
                    <div className="button-upgrade">
                        {this.props.appState.buttonUpgrade.map((buttonUpg, buttonIndex) => {
                            return (

                                <button className={"x" + buttonUpg} style={{ "backgroundColor": this.returnButtonColor(this.props.appState.clicked, upgradeInfo[index] * buttonUpg) }} onClick={(e) => this.props.handleUpgradeClick(index, num.name[2], upgradeInfo[index], buttonUpg, this.state.upgradeFlag)} key={buttonIndex}>
                                    {"x" + buttonUpg}({this.returnMoose(upgradeInfo[index] * buttonUpg)})
                                                        </button>
                            )
                        }
                        )}
                    </div>
                    <progress value={(this.props.appState.clicked / upgradeInfo[index]) * 100} max="100" />
                </div>
            )
        }))
    }

    handlerUpgradeStatus(statFlag) {
        statFlag ? this.setState({ upgradeFlag: true }) : this.setState({ upgradeFlag: false });
    }

    render() {

        return (
            <div className="menu">
                <div>
                    <button className="button-upgrades" onClick={this.handlerUpgradeStatus.bind(this, false)}>Добыча</button>
                    <button className="button-upgrades" onClick={this.handlerUpgradeStatus.bind(this, true)}>Бизнес</button>
                </div>
                <div className="Moose">
                    <img src={this.props.appState.mooseSrc} onClick={(e) => {

                        this.props.handleMooseClick();

                    }} alt="moose" />
                </div>
                {
                    this.state.upgradeFlag ? this.returnUpgradesMoose(upgrades, this.props.appState.upgrades, 1) : this.returnUpgradesMoose(business, this.props.appState.business, 2)
                }
                <div className="scoreboard">
                    Лосиков: {this.returnMoose(this.props.appState.clicked)}<br />PC: {this.returnMoose(this.props.appState.clickCounter * this.props.appState.clickMultiplier)}<br />DPS: {this.returnMoose(this.props.appState.dps * this.props.appState.clickMultiplier)}
                </div>
            </div>
        );

    }
}