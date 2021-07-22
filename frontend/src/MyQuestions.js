import React, {useState, useEffect } from 'react';
import { isLogged, getProfileQuestions } from './api';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import OneQuestion from './OneQuestion';

function MyQuestions() {
    const [questions, setQuestions] = useState([]);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [questionsStart, setQuestionsStart] = useState(1);
    const [questionsEnd, setQuestionsEnd] = useState(5);
    const [questionsOver, setQuestionsOver] = useState(false);

    useEffect(() => {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(err => {
            console.log(err);
            window.alert('You have to create an account to keep track of your questions.');
            setTimeout(()=>{window.location.href='/'}, 500);
        })
    }, [])

    useEffect(() => {
        if (userId) {
            getProfileQuestions(parseInt(userId), questionsStart, questionsEnd)
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
    }, [userId, questionsStart])

    return (
        <div className='main-page'>
            <NavBar />
            <div style={{'paddingTop': '70px'}} />
            <h4>Questions asked by {username}</h4>
            {questions.length &&
                questions.map((value, index) => {
                    return (
                        <OneQuestion key={index} question={value} />
                    );
                })
            }
            {questions.length && !questionsOver &&
                <Button onClick={()=>{setQuestionsStart(questionsStart+5);setQuestionsEnd(questionsEnd+5)}}
                        variant='outline-primary'>
                    See more
                </Button>
            }
            {questionsOver &&
                        <div style={{'color': 'red'}}>No more questions found.</div>
            }
            {!questions.length &&
                <div style={{'color': 'red'}}>No questions found.</div>
            }
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default MyQuestions;