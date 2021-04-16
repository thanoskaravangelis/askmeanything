import React from 'react';
import './Landing.css';

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
                            <button id="sign-in-btn">Sign In</button>
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
                                <div id="keyword-title">Popular keywords</div>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div id="keyword-title">Top Questions</div>
                            </div>
                        </div>
                        <div className="small-boxes-container">
                            <div id="small-1" className="small-content-box">
                                <div className="box-title center-content">
                                    <div id="keyword-title">Ask a new Question</div>
                                </div>
                            </div>
                            <div id="small-2" className="small-content-box">
                                <div className="box-title center-content">
                                    <div id="keyword-title">Answer a Question</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Landing;