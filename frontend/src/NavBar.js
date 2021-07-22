import React, { useState, useEffect } from 'react';
import { isLogged } from './api';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './images/lightbulb_icon.png';

function NavBar() {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const logout = () => {
        localStorage.setItem('token', null);
        window.location.href='/signin';
    }


    return(
        <Navbar
                expand="lg"
                variant="light"
                fixed='top'
                style={{ backgroundColor : 'rgb(236, 141, 16)'}}
                >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Brand href="#home">
                    <img className='logo-icon' src={logo}/>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">AskMeAnything</Nav.Link>
                    {userId &&
                        <Nav.Link href="/my">My AskMeAnything</Nav.Link>
                    }
                    <Nav.Link href='/questions'>Questions</Nav.Link>
                    {userId &&
                        <Nav.Link href="/ask">Ask a question</Nav.Link>            
                    }
                </Nav>
                {userId &&
                    <Nav>
                        <Nav.Link href={`/users/${userId}`}>Profile</Nav.Link>            
                        <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                    </Nav>
                }
                {!userId &&
                    <Nav>
                        <Nav.Link href="/signin">Login</Nav.Link>
                        <Nav.Link href="/signup">Register</Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
    return(
        <div className="top-container">
                <div className="title-landing">
                    <div id="logo-icon"></div>
                    <div className="title-text" onClick={()=>{window.location.href='/'}}>askmeanything</div>
                </div>
                <div className="gap-top" >
                </div>
                <div className="top-button-container">
                    {!userId &&
                        <div className="sign-in-container">
                            <div id="sign-in-btn" onClick={()=>{window.location.href='/signin'}}>Sign In</div>
                        </div>
                    }
                    {!userId &&
                        <div className="sign-up-container">
                            <button id="sign-up-btn" onClick={()=>{window.location.href='/signup'}}>Sign Up</button>
                        </div>
                    }
                    {userId &&
                        <div className="sign-up-container">
                        <button id="sign-up-btn" onClick={logout}>Logout</button>
                        </div>
                    }
                </div>
            </div>
    );
}

export default NavBar;