import React, {useState, useEffect } from 'react';
import { isLogged, getProfileAnswered } from './api';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import OneQuestion from './OneQuestion';

function MyAnswered() {
    const [answered, setAnswered] = useState([]);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [answeredStart, setAnsweredStart] = useState(1);
    const [answeredEnd, setAnsweredEnd] = useState(5);
    const [answeredOver, setAnsweredOver] = useState(false);

    useEffect(() => {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(err => {
            console.log(err);
            window.alert('You have to create an account to keep track of your answered questions.');
            setTimeout(()=>{window.location.href='/'}, 500);
        })
    }, [])

    useEffect(() => {
        if (userId) {
            getProfileAnswered(userId, answeredStart, answeredEnd)
            .then(response => {
                console.log(response.data);
                if (!response.data.length) setAnsweredOver(true);
                setAnswered(answered.concat(response.data));
            })
            .catch(err => {
                console.log(err);
                setAnsweredOver(true);
            })
        }
    }, [userId, answeredStart])

    return (
        <div className='main-page'>
            <NavBar />
            <div style={{'paddingTop': '70px'}} />
            <h4 style={{'marginTop': '5px'}}>Questions answered by {username}</h4>
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
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default MyAnswered;