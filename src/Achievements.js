import React, { Component } from 'react';
import './App.css';
import AchLogo from './Achievement.png';
import crossButton from './cross.png';
var upgrades = require('./achievementsConfig.json');


class PopUp extends Component {

    onMouseHandler(description) {

        alert(description);

    }

    returnAchColor(totalClicked, minMoose) {

        let buttonColor = totalClicked >= minMoose ? "#ECDFDF" : "#C1C1C1";
        return(buttonColor);   

    }
    
    render() {

        return (
            <div className="popup">
                <div className="popup_inner">
                    <div className="upgrades">
                    {upgrades.map((upgrade, index) => {
                        return(
                        <div className="upgrade" key={index+1} onMouseOver={this.onMouseHandler.bind(this, upgrade.description)} style={{"backgroundColor": this.returnAchColor(this.props.mooseClicked, upgrade.value)}}>
                            {upgrade.name}
                        </div>
                        )
                    })}
                    </div>
                    <div className="closeButtonPopUp">
                    <img src={crossButton} alt="cross" onClick={this.props.closePopUp} />
                    </div>
                    </div>
            </div>
        );

    }
}


export default class Achievements extends Component {

    constructor() {

        super();
        this.state = {
            showPopUp: false
        };

    }

    achClickHandler() {

        this.setState({
            showPopUp: !this.state.showPopUp
        });

    }

    render() {

        return (
            <div className="achievement">
                <img src={AchLogo} alt="Achievement" onClick={this.achClickHandler.bind(this)} />
                {
                    this.state.showPopUp ? <PopUp closePopUp={this.achClickHandler.bind(this)} mooseClicked={this.props.mooseClicked} /> : null
                }
            </div>
        );
        
    }
}