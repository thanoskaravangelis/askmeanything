import React from 'react';
import './Landing.css';

class NavBar extends React.Component{

    constructor(props) {
        super(props);
        this.homeRedirect = this.homeRedirect.bind(this);
    }

    homeRedirect = (e) => {
        window.location.href = "/";
    }

    redirectSgnUp = (e) => {
        window.location.href = "/signup";
    }

    redirectSgnIn = (e) => {
        window.location.href = "/signin";
    }

    render(){
        return(
            <div className="top-container">
                    <div className="title-landing">
                        <div id="logo-icon"></div>
                        <div className="title-text" onClick={this.homeRedirect}>askmeanything</div>
                    </div>
                    <div className="gap-top" >
                    </div>
                    <div className="top-button-container">
                        <div className="sign-in-container">
                            <div id="sign-in-btn" onClick={this.redirectSgnIn}>Sign In</div>
                        </div>
                        <div className="sign-up-container">
                            <button id="sign-up-btn" onClick={this.redirectSgnUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default NavBar;