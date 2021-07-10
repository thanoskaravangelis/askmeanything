import React, { useState, useEffect } from 'react';
import './Landing.css';
import './Questions.css'
import Pagination from 'react-bootstrap/Pagination'
import OneQuestion from './OneQuestion';
import { getQuestions } from './api';

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const altStart = '2000-01-01';
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const altEnd = currentDate.toISOString().split('T')[0];
        getQuestions(startDate || altStart , endDate || altEnd)
        .then(response => {
            console.log(response.data);
            setQuestions(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [startDate, endDate])

    return (
            <div className="questions-main-div">
                <h3 className="questions-title">
                    Questions
                </h3>
                <h6>Choose a start and an end date</h6>
                <div className='flex'>
                    <div className='flex margin'>
                        <h6 className='margin'>From</h6>
                        <input type='date' value={startDate} onChange={(event)=>setStartDate(event.target.value)}/>
                    </div>
                    <div className='flex margin'>
                        <h6 className='margin'>To</h6>
                        <input type='date' value={endDate} onChange={(event)=>setEndDate(event.target.value)}/>
                    </div>
                </div>

                {questions.map((value, index) => {
                    return (
                        <OneQuestion key={index} question={value} />
                    );
                })}
                {!questions.length && 
                    <div style={{'color': 'red'}}>No more questions found.</div>
                }
            </div>
    )
}

export default Questions;