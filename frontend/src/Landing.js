import React from 'react';
import './Landing.css';
import Footer from './Footer.js';
import NavBar from './NavBar.js';

class Landing extends React.Component{

    constructor(props) {
        super(props);
    }

    redirectToNewQuestion = (e) => {
        window.location.href = '/ask' ;
    }

    redirectToQuestions = (e) => {
        window.location.href = '/questions';
    }

    render(){
        return(
            <div className="landing-container">
                <NavBar />
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
                                <div id="quest-img"></div>
                            </div>
                            <div className="quest-text">
                                <p>Having trouble solving an issue? <br></br> Would you like a second
                                    opinion on a topic? <br></br> Then, you are where you should be! <br></br> Ask a 
                                    question now by clicking below!
                                </p>
                            </div>
                            <div className="question-but center-content">
                                <button className="quest-but" onClick={this.redirectToNewQuestion}><div>Ask a new Question</div></button>
                            </div>
                        </div>
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div className="keyword-title">Answer a question</div>
                            </div>
                            <div className="image-container center-content">
                                <div id="quest-img-2"></div>
                            </div>
                            <div className="quest-text">
                                <p>Do you like solving problems? <br></br> Are you a person that enjoys helping others? <br></br>
                                    Browse the questions and answer to any one of them! <br></br> 
                                </p>
                            </div>
                            <div className="question-but center-content">
                                <button className="quest-but" onClick={this.redirectToQuestions}><div>Answer questions</div></button>
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
                <div className="footer-page-container">
                    <Footer />
                </div>
            </div>
        );
    }

}

export default Landing;