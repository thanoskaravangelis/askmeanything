import React from 'react';
import './Landing.css';
import Footer from './Footer.js';

class Landing extends React.Component{

    render(){
        return(
            <div className="landing-container">
                <div className="top-container">
                    <div className="title-landing">
                        <div id="logo-icon"></div>
                        <div className="title-text">askmeanything</div>
                    </div>
                    <div className="gap-top" >
                    </div>
                    <div className="top-button-container">
                        <div className="sign-in-container">
                            <div id="sign-in-btn">Sign In</div>
                        </div>
                        <div className="sign-up-container">
                            <button id="sign-up-btn">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div className="main-landing-container">
                    <div className="heading-text">
                        <p>Welcome to askmeanything!</p>
                    </div>
                    <div className="line-separator"></div>
                    <div className="boxes-container">
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div id="keyword-title">Add a new question</div>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div id="keyword-title">Answer a question</div>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div id="keyword-title">Popular keywords</div>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div id="keyword-title">Some questions' stats...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-menu"><Footer /></div>
            </div>
        );
    }

}

export default Landing;