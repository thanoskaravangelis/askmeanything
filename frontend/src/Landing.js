import React, { useState, useEffect } from 'react';
import './Landing.css';
import Footer from './Footer.js';
import NavBar from './NavBar.js';
import { isLogged } from './api';

function Landing(props) {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            console.log(response.data);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const redirectToNewQuestion = (e) => {
        if (!userId) {
            window.alert('You have to login to ask questions.');
        }
        else {
            window.location.href = '/ask' ;
        }
    }

    const redirectToQuestions = (e) => {
        window.location.href = '/questions';
    }

        return(
            <div className="landing-container">
                <NavBar />
                <div style={{'paddingTop': '70px' }} />
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
                                <button className="quest-but" onClick={redirectToNewQuestion}><div>Ask a new Question</div></button>
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
                                <button className="quest-but" onClick={redirectToQuestions}><div>Answer questions</div></button>
                            </div>
                        </div>
                        {props.case!=='my' &&
                            <div className="content-box">
                                <div className="box-title center-content">
                                    <div className="keyword-title">Popular keywords</div>
                                </div>
                                <div className="image-container center-content">
                                    <div id="quest-img-3"></div>
                                </div>
                                <div className="quest-text">
                                    <p>Are you looking for the questions of a specific keyword?</p>
                                </div>
                                <div className="question-but center-content">
                                    <button className="quest-but2" onClick={()=>{window.location.href='/keywords'}}>Keywords Questions</button>
                                </div>
                            </div>                    
                        }
                        {props.case==='my' &&
                            <div className="content-box">
                                <div className="box-title center-content">
                                    <div className="keyword-title">My contributions</div>
                                </div>
                                <div className="quest-text">
                                    <p>Do you want to see your activity so far?</p>
                                </div>
                                <div className="question-but center-content">
                                    <button className="quest-but" onClick={()=>{window.location.href='/questions/my'}}>My questions</button>
                                    <button className="quest-but" onClick={()=>{window.location.href='/answers/my'}}>My answers</button>
                                </div>
                            </div>
                        }
                        <div className="content-box">
                            <div className="box-title center-content">
                                <div className="keyword-title">Statistics</div>
                                <div className="image-container center-content">
                                    <div id="quest-img-4"></div>
                                </div>
                                <div className="quest-text">
                                    <p>Do you want to see some interesting statistics about all users?</p>
                                </div>

                                <div className="question-but center-content">
                                    <button className="quest-but2" onClick={()=>{window.location.href='/stats'}}>See statistics</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{'paddingBottom': '100px'}} />
                <div className="footer-page-container">
                    <Footer />
                </div>
            </div>
        );
}

export default Landing;