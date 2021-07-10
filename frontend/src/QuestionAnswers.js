import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './Questions.css';

function Answer(props) {
    const [answer, setAnswer] = useState(props.answer);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    
    useEffect(() => {
        setAnswer(props.answer);
    }, [props.answer]);

    const reGetAnswer = () => {
        
    }

    const upvote = () => {

    }

    const delUpvote = () => {

    }

    const downvote = () => {

    }

    const delDownvote = () => {

    }

    return (
        <div className='one-answer'>
            <div className="flex whitespace">
                <div>asked by </div>
                <a className="profile-href" href={`/users/1`}>thanosblv </a>
                <div className='break' />
                <div style={{'fontSize': 'small'}}>on {answer.createdAt.replace('T', ' ').slice(0, -8)}</div>
            </div>
            <div style={{'marginTop': '4px'}}>
                {answer.text}
            </div>
            <div className='flex'>
                <Button 
                    className='margin'
                    variant='outline-success'
                    onClick={upvoted ? delUpvote : upvote}>
                        {upvoted ? 'Upvoted' : 'Upvote'}
                </Button>
                <Button
                    className='margin'
                    variant='outline-warning'
                    onClick={downvoted ? delDownvote : downvote}>
                        {downvoted ? 'Downvoted' : 'Downvote'}
                </Button>
                <Button
                    className='margin'
                    variant='outline-primary'
                    onClick={()=>{window.location.href=`/answer/${answer.question.id}`}}>
                    Answer
                </Button>
            </div>

        </div>
    )

}

function QuestionAnswers(props) {
    const [answers, setAnswers] = useState(props.answers);

    useEffect(() => {
        setAnswers(props.answers);
    }, [props.answers]);

    return(
        <div style={{'marginTop': '5px'}}>
            <h5>Answers</h5>
            <div>
                {answers.map((value, index) => {
                    return (
                        <Answer key={index} answer={value} />
                    )
                })}
            </div>
            {!answers.length &&
                <div style={{'color': 'red'}}>No answers posted yet.</div>
            }
        </div>
    )
}

export default QuestionAnswers;