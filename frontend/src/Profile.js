import React, { useState, useEffect } from 'react';

import './Profile.css';
import NavBar from './NavBar';
import Footer from './Footer';
import OneQuestion from './OneQuestion';
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
            setQuestions(questions.concat(response.data.questions));
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getAnswered = () => {
        getProfileAnswered(parseInt(props.id), answeredStart, answeredEnd)
        .then(response => {
            console.log(response.data);
            setAnswered(answered.concat(response.data.answered));
        })
        .catch(err => {
            console.log(err);
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
            {!user &&
                <div style={{'color': 'red'}}>{err}</div>
            }
            {user &&
                <div style={{'paddingBottom': '100px'}}>
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                    <h4>Questions asked by {user.username}</h4>
                    {questions.length &&
                        questions.map((value, index) => {
                            return (
                                <OneQuestion key={index} question={value} />
                            );
                        })
                    }
                    {!questions.length &&
                        <div style={{'color': 'red'}}>No questions found.</div>
                    }
                    <h4>Questions answered by {user.username}</h4>
                    {answered.length &&
                        answered.map((value, index) => {
                            return (
                                <OneQuestion key={index} question={value} />
                            );
                        })
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