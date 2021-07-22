import React, { useState, useEffect } from 'react';
import QuestionKeywords from './QuestionKeywords';
import QuestionAnswers from './QuestionAnswers';
import './Questions.css';
import Button from 'react-bootstrap/Button';

function OneQuestion(props) {
    const [question, setQuestion] = useState(props.question);
    
    useEffect(()=>{
        setQuestion(props.question);
        console.log(props.question);
    }, [props.question]);

    return (
        <div className = "question-div">
            <div className="question-div-date-who flex whitespace">
                <div>asked by </div>
                <a className="profile-href" href={`/users/${question.user.id}`}>{question.user.username} </a>
                <div className='break' />
                <div>on {question.createdAt.replace('T', ' ').slice(0, -8)}</div>
            </div>
            <div className="line-separator" />
            <div className= "question-div-title">{question.title}</div>
            <div style={{'marginTop': '5px'}} />
            <div>{question.text}</div>
            <div style={{'marginTop': '5px'}} />
            <QuestionKeywords keywords={question.keywords} />
            <div style={{'marginTop': '5px'}} />
            {props.showAnswers &&
                <QuestionAnswers answers={question.answers} />        
            }
            {!props.showAnswers && question.answers.length>0 &&
                <div style={{'color': 'green'}}>There have been posted {question.answers.length} answers till now</div>
            }
            {!props.showAnswers && !question.answers.length &&
                <div style={{'color': 'red'}}>No answers found till now</div>
            }
            {!props.showAnswers &&
                <Button
                    className='margin'
                    variant='outline-warning'
                    onClick={()=>{window.location.href=`/questions/${question.id}`}}
                    style={{color:'black'}}>
                    See details/Answer
                </Button>        
            }
        </div>
    );
}

export default OneQuestion;