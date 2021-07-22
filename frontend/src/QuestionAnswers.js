import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './Questions.css';

import { addVote, deleteVote, isLogged } from './api';

function Answer(props) {
    const [userId, setUserId] = useState(null);
    const [answer, setAnswer] = useState(props.answer);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [upvoteId, setUpvoteId] = useState(null);
    const [downvoteId, setDownvoteId] = useState(null);
    
    useEffect(() => {
        isLogged()
        .then(async (response) => {
            console.log(response);
            setUserId(response.data.id);
            setAnswer(props.answer);
        })
        .catch(err => {
            console.log(err);
            setAnswer(props.answer);
        })
    }, [props.answer]);

    const updateUpvotes = () => {
        let tempUpvotes = 0;
        let tempDownvotes = 0;
        for (let vote of answer.votes) {
            if (vote.userId===userId) {
                if (vote.upvote) {
                    setUpvoted(true);
                    setUpvoteId(vote.id);
                    setDownvoted(false);
                }
                else  {
                    setDownvoted(true);
                    setDownvoteId(vote.id);
                    setUpvoted(false);
                }
            }
            if (vote.upvote) tempUpvotes++;
            else if (vote.downvote) tempDownvotes++;
        }
        setUpvotes(tempUpvotes);
        setDownvotes(tempDownvotes);
    }

    useEffect(() => {
        updateUpvotes();
    }, [answer, userId])

    const upvote = () => {
        if (!userId) {
            window.alert('YOu cannot vote for an answer without an account.')
        }
        else if (downvoted) {
            window.alert('You have to remove your downvote at first.');
        }
        else {
            addVote(userId, answer.id, 'upvote')
            .then(response => {
                console.log(response.data);
                setUpvoted(true);
                setUpvotes(upvotes+1);
                setUpvoteId(response.data.id);
            })
            .catch(err => {
                console.log(err);
                window.alert('Sorry, we could not post your upvote');
            })    
        }
    }

    const delUpvote = () => {
        deleteVote(upvoteId)
        .then(response => {
            console.log(response.data);
            setUpvoted(false);
            setUpvoteId(null);
            setUpvotes(upvotes-1);
        })
        .catch(err => {
            console.log(err);
            window.alert('Sorry, we could not delete your downvote.');
        })
    }

    const downvote = () => {
        if (!userId) {
            window.alert('YOu cannot vote for an answer without an account.')
        }
        else if (upvoted) {
            window.alert('You have to remove your upvote at first.');
        }
        else {
            addVote(userId, answer.id, 'downvote')
            .then(response => {
                console.log(response.data);
                setDownvoted(true);
                setDownvotes(downvotes+1);
                setDownvoteId(response.data.id);
            })
            .catch(err => {
                console.log(err);
                window.alert('Sorry, we could not post your downvote');
            })    
        }
    }

    const delDownvote = () => {
        deleteVote(downvoteId)
        .then(response => {
            console.log(response.data);
            setDownvoted(false);
            setDownvoteId(null);
            setDownvotes(downvotes-1);
        })
        .catch(err => {
            console.log(err);
            window.alert('Sorry, we could not delete your downvote.');
        })
    }

    return (
        <div className='one-answer'>
            <div className="flex whitespace">
                <div>asked by </div>
                <a className="profile-href" href={`/users/${answer.user.id}`}>{answer.user.username} </a>
                <div className='break' />
                <div style={{'fontSize': 'small'}}>on {answer.createdAt.replace('T', ' ').slice(0, -8)}</div>
            </div>
            <div style={{'marginTop': '4px'}}>
                {answer.text}
            </div>
            <div style={{'marginTop': '4px'}} className='flex'>
                <div className='margin' style={{'padding': '3px', 'backgroundColor': 'white', 'borderRadius': '5px'}}>{upvotes} upvotes</div>
                <div className='margin' style={{'padding': '3px', 'backgroundColor': 'white', 'borderRadius': '5px'}}>{downvotes} downvotes</div>
            </div>
            <div className='flex'>
                <Button 
                    className='margin'
                    variant={upvoted ? 'success' : 'outline-success'}
                    onClick={upvoted ? delUpvote : upvote}>
                        {upvoted ? 'Upvoted' : 'Upvote'}
                </Button>
                <Button
                    className='margin'
                    variant={downvoted ? 'warning' : 'outline-warning'}
                    onClick={downvoted ? delDownvote : downvote}>
                        {downvoted ? 'Downvoted' : 'Downvote'}
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