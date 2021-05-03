import React from 'react';
import './Landing.css';
import Footer from './Footer.js';
import askquestion from './images/askquestion.jpg'

class Landing extends React.Component{

    constructor(props) {
        super(props);
        this.homeRedirect = this.homeRedirect.bind(this);
    }

    homeRedirect = (e) => {
        window.location.href = "/";
    }

    render(){
        return(
            <div className="landing-container">
                <div className="top-container">
                    <div className="title-landing">
                        <div id="logo-icon"></div>
                        <div className="title-text" onClick={this.homeRedirect}>askmeanything</div>
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
                                <div className="keyword-title">Add a new question</div>
                            </div>
                            <div className="image-container center-content">
                                <img id="quest-img" src={askquestion}/>
                            </div>
                            <div className="quest-text">
                                <p>Having trouble solving an issue? <br></br> Would you like a second
                                    opinion on a topic? <br></br> Then, you are where you should be! <br></br> Ask a 
                                    question now by clicking below!
                                </p>
                            </div>
                            <div className="question-but center-content">
                                <button id="quest-but"><div>Ask a new Question</div></button>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div className="keyword-title">Answer a question</div>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div className="keyword-title">Popular keywords</div>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div className="keyword-title">Some questions' stats...</div>
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