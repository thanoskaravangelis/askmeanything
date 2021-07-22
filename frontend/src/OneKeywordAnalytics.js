import React, { useState, useEffect } from 'react';
import { getKeywordAnalytics } from './api';
import NavBar from './NavBar';
import Footer from './Footer';
import OneQuestion from './OneQuestion';

function OneKeywordAnalytics(props) {
    const [name, setName] = useState(props.name);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setName(props.name);
    }, [props,name])

    useEffect(()=> {
        getKeywordAnalytics(name)
        .then(response => {
            console.log(response.data);
            setQuestions(response.data.questions);
        })
        .catch(err => {
            console.log(err);
        })
    }, [name])

    if (props.page) {
        return (
            <div className='all-page'>
                <NavBar />
                <div style={{'paddingTop': '70px'}} />
                <h6>Questions of keyword '{name}'</h6>        
                {questions.length &&
                    questions.map((value, index) => {
                        console.log(value);
                        return(
                            <OneQuestion question={value} key={index} />
                        )
                    })
                }
                {!questions.length &&
                    <div style={{'color': 'red'}}>No questions found.</div>
                }
                <div style={{'paddingTop': '100px'}} />
                <Footer />
            </div>
        )
    }
    else {
        return (
            <div>
                <h6>Questions of keyword '{name}'</h6>        
                {questions.length &&
                    questions.map((value, index) => {
                        return(
                            <OneQuestion question={value} key={index} />
                        )
                    })
                }
                {!questions.length &&
                    <div style={{'color': 'red'}}>No questions found.</div>
                }
            </div>
        )
    }
}

export default OneKeywordAnalytics;