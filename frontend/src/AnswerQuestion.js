import React, { useState, useEffect } from 'react';
import { Answer, getQuestion, getQuestions, isLogged } from './api';
import OneQuestion from './OneQuestion';
import NavBar from './NavBar';
import Footer from './Footer';
import './AnswerQuestion.css';
import Button from 'react-bootstrap/Button';

function AnswerQuestion(props) {
    const [questionId, setQuestionId] = useState(parseInt(props.id));
    const [question, setQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [text, setText] = useState("");
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(()=>{
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            window.location.href='/';
        })
        getQuestions()
        .then(response => {
            console.log(response.data);
            setQuestions(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const submit = () => {
        if (!text) {
            setError('Fill the text field');
            window.scrollTo({
                top:0,
                left:0,
                behavior:'smooth'
            });
        }
        else {
            Answer(userId, questionId, text)
            .then(response => {
                console.log(response);
                setSuccess('Answer published successfully.');
                setError(null);
                window.scrollTo({
                    top:0,
                    left:0,
                    behavior:'smooth'
                });
                setTimeout(()=>{window.location.href=`/questions/${questionId}`;}, 300);
            })
            .catch(err => {
                console.log(err);
                setError('Sorry, we could not post your answer.');
                setSuccess(null);
                window.scrollTo({
                    top:0,
                    left:0,
                    behavior:'smooth'
                });
            })
        }
    }

    useEffect(()=>{
        getQuestion(questionId)
        .then(response => {
            console.log(response.data);
            setQuestion(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [questionId])

    return (
        <div className="all-page">
            <NavBar />
            <div className="line-separator" />
            <div style={{'marginTop': '10px'}} />
            <div className='flex'>
                <h5>Select a question to answer</h5>
                <select value={questionId} onChange={(event)=>{setQuestionId(event.target.value)}}>
                    {questions.map((value, index) => {
                        return(
                            <option key={index} value={value.id}>({index+1}) {value.title}</option>
                        )
                    })}
                </select>
            </div>
            <div style={{'marginTop': '10px'}} />
            <div style={{'color': 'red'}}>{error}</div>
            <div style={{'color': 'green'}}>{success}</div>
            {question &&
                <OneQuestion question={question} showAnswers={true}/>        
            }
            {!question &&
               <div style={{'color': 'red'}}>Invalid question</div>
            }
            <div style={{'marginTop': '10px'}} />
            <h5>Post an answer</h5>
            <textarea className='answer-textarea' value={text} onChange={(event)=>{setText(event.target.value);setError(null)}} />
            <div className='break' />
            <Button variant='outline-primary' onClick={submit}>Submit answer</Button>
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default AnswerQuestion;