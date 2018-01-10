import React, { Component } from 'react';
import './App.css';
var upgrades = require('./businessConfig.json');
var business = require('./productionConfig.json');


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

    // geomTotalCost(totalItems, oneItemCost) {
    // return(
    //     (oneItemCost * (1 - Math.pow(1.25, totalItems))) /
    // );    
    // }

    returnUpgradesMoose(upgradeKind, upgradeInfo, upgradeCount) {
        
        var dpsText = '';
        var clickText = '';
        return (upgradeKind.map((num, index) => {

            num.name[2] !== "" ? dpsText = num.name[2] + " DPS" : dpsText = "";
            num.name[3] !== "" ? clickText = "+ " + num.name[3] + " per click" : clickText = "";

            this.props.appState.fishFlag ? (
                 this.props.appState.upgrades[index] === 0 ? this.props.appState.upgrades[index] = num.name[1] : null
                 // Проверка, что первоначальные данные взяты всего один раз
             ) : this.props.appState.business[index] === 0 ? this.props.appState.business[index] = num.name[1]: null
                 // Проверка, что первоначальные данные взяты всего один раз    
                        
            let availableUpgrade = this.props.appState.moneyWallet >= upgradeInfo[index];
            // console.log(upgradeInfo[index]);
            return (
                <div className={availableUpgrade ? "upgradeLight" : "upgradeDark"} key={index + 1}>
                    <div className="upgrade-text">
                        {num.name[0]}<br />{clickText}{dpsText}
                    </div>
                    <div className="button-upgrade">
                        {this.props.appState.buttonUpgrade.map((buttonUpg, buttonIndex) => {
                            return (

                                <button className={"x" + buttonUpg} style={{ "backgroundColor": this.returnButtonColor(this.props.appState.moneyWallet, upgradeInfo[index] * buttonUpg) }} onClick={(e) => this.props.handleUpgradeClick(index, num.name[2], upgradeInfo[index], buttonUpg, num.name[3])} key={buttonIndex}>
                                    {"x" + buttonUpg}({this.returnMoose(upgradeInfo[index] * buttonUpg)})
                                                        </button>
                            )
                        }
                        )}
                    </div>
                    <progress value={(this.props.appState.moneyWallet / upgradeInfo[index]) * 100} max="100" />
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
                    <button className="button-upgrades" onClick={this.props.handleFishFlagChanger.bind(this, false)}>Добыча</button>
                    <button className="button-upgrades" onClick={this.props.handleFishFlagChanger.bind(this, true)}>Бизнес</button>
                </div>
                <div className="Moose">
                    <img src={this.props.appState.mooseSrc} onClick={(e) => {

                        this.props.handleMooseClick();

                    }} alt="moose" />
                </div>
                {
                    this.props.appState.fishFlag ? this.returnUpgradesMoose(upgrades, this.props.appState.upgrades) : this.returnUpgradesMoose(business, this.props.appState.business)
                }
                <div className="scoreboard">
                    Рыбок: {this.returnMoose(this.props.appState.fishClicked)}<br />
                    Денег: {this.props.appState.moneyWallet}<br />
                    PC(FISH): {this.returnMoose(this.props.appState.clickCounter * this.props.appState.clickMultiplier)}<br />
                    PC($): {this.returnMoose(this.props.appState.moneyCounter * this.props.appState.clickMultiplier)}<br />
                    DPS(FISH): {this.returnMoose(this.props.appState.fishDPS)}<br />
                    DPS($): {this.returnMoose(this.props.appState.moneyDPS)}<br />
                </div>
            </div>
        );

    }
}