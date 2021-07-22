import React, { useState, useEffect } from 'react';

import './Profile.css';
import NavBar from './NavBar';
import Footer from './Footer';
import OneQuestion from './OneQuestion';
import Button from 'react-bootstrap/Button';
import { getProfile, getProfileAnswered, getProfileQuestions, isLogged } from './api';


function Profile(props) {
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answered, setAnswered] = useState([]);
    const [userId, setUserId] = useState(null);
    const [err, setErr] = useState(null);
    const [questionsStart, setQuestionsStart] = useState(1);
    const [questionsEnd, setQuestionsEnd] = useState(5);
    const [answeredStart, setAnsweredStart] = useState(1);
    const [answeredEnd, setAnsweredEnd] = useState(5);
    const [questionsOver, setQuestionsOver] = useState(false);
    const [answeredOver, setAnsweredOver] = useState(false);

    const logged = () => {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
            window.alert('You have to login to view another user\'s profile page.');
            setTimeout(()=>{window.location.href='/';}, 300);
            
        })
    }

    const profile = () => {
        getProfile(parseInt(props.id))
        .then(response => {
            setUser(response.data);
        })
        .catch(err => {
            setErr('Sorry, user not found.');
        })
    }

    const getQuestions = () => {
        getProfileQuestions(parseInt(props.id), questionsStart, questionsEnd)
        .then(response => {
            console.log(response);
            if (!response.data.questions.length) setQuestionsOver(true);
            setQuestions(questions.concat(response.data.questions));
        })
        .catch(err => {
            console.log(err);
            setQuestionsOver(true);
        })
    }

    const getAnswered = () => {
        getProfileAnswered(parseInt(props.id), answeredStart, answeredEnd)
        .then(response => {
            console.log(response.data);
            setAnswered(answered.concat(response.data));
        })
        .catch(err => {
            console.log(err);
            setAnsweredOver(true);
        })
    }

    useEffect(() => {
        logged();
        profile();
    }, [])

    useEffect(() => {
        getQuestions();
    }, [questionsStart]);

    useEffect(() => {
        getAnswered();
    }, [answeredStart]);

    return (
        <div className='main-page'>
            <NavBar />
            <div style={{'paddingTop': '70px'}} />
            {!user &&
                <div style={{'color': 'red'}}>{err}</div>
            }
            {user &&
                <div style={{'paddingBottom': '100px'}}>
                    <div className='center-content'>
                        <div style={{'fontSize': 'x-large'}}>{user.username}</div>
                        <div style={{'fontSize': 'large'}}>Email: {user.email}</div>
                        {user.country &&
                            <div style={{'fontSize': 'large'}}>From {user.country}</div>                
                        }
                        {user.first_name &&
                            <div style={{'fontSize': 'large'}}>First name: {user.first_name}</div>                
                        }
                        {user.last_name &&
                            <div style={{'fontSize': 'large'}}>Last name {user.last_name}</div>                
                        }
                        {user.createdAt &&
                            <div style={{'fontSize': 'large'}}>Member since {user.createdAt.slice(0, 10)}</div>                
                        }
                        
                    </div>
                    <hr></hr>
                    <h4>Questions asked by {user.username}</h4>
                    {questions.length &&
                        questions.map((value, index) => {
                            return (
                                <OneQuestion key={index} question={value} />
                            );
                        })
                    }
                    {questions.length && !questionsOver &&
                        <Button onClick={()=>{setQuestionsStart(questionsStart+5);setQuestionsEnd(questionsEnd+5)}}
                                variant='outline-warning'>
                            See more
                        </Button>
                    }
                    {questionsOver &&
                        <div style={{'color': 'red'}}>No more questions found.</div>
                    }
                    {!questions.length &&
                        <div style={{'color': 'red'}}>No questions found.</div>
                    }
                    <h4 style={{'marginTop': '5px'}}>Questions answered by {user.username}</h4>
                    {answered.length &&
                        answered.map((value, index) => {
                            return (
                                <OneQuestion key={index} question={value} />
                            );
                        })
                    }
                    {answered.length && !answeredOver &&
                        <Button onClick={()=>{setAnsweredStart(answeredStart+5);setAnsweredEnd(answeredEnd+5)}}
                                variant='outline-primary'>
                            See more
                        </Button>
                    }
                    {answeredOver &&
                        <div style={{'color': 'red'}}>No more answered questions found.</div>
                    }
                    {!answered.length &&
                        <div style={{'color': 'red'}}>No answered questions found.</div>
                    }
                </div>
            
            }
            <Footer />
        </div>
    )

}

export default Profile;