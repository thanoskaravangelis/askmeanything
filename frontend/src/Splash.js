import React, { useState, useEffect } from 'react';
import './Splash.css';
import { loginPost, isLogged } from './api';


function Splash () {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    useEffect(() => {
        isLogged()
        .then(response => {
            window.location.href = '/';
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
        loginPost(username, password)
        .then(response => {
            localStorage.setItem('token', response.data.access_token);
            setSuccess('Logged in succesfully');
            setTimeout(()=>{window.location.href='/'}, 200);
        })
        .catch(err => {
            console.log(err);
            setError("Wrong username or password");
        })
    }

    return (
        <div className="basic-container">
            <div className="main-splash-container center-content">
                <div id="logo"></div>
                <div className="title-container center-content">
                    <div className="title-text" onClick={()=>{window.location.href='/'}}>askmeanything</div>
                </div>
                <div>
                    <span className="center-content" id="line-title"></span>
                </div>
                <div className="login-container center-content">
                    <div id="form-container" className="center-content">
                        <div style={{'color': 'red'}}>{error}</div>
                        <div style={{'color': 'green'}}>{success}</div>
                        <form onSubmit={(event)=>{handleSubmit(event)}}>
                            <div className="login-form">
                                <label id="username-label">Username</label>
                                <input id="username-input" label="Username" name="username" value={username} onChange={(event)=>{setUsername(event.target.value);setError(null);setSuccess(null);}} type="text"/>
                                <label id="password-label">Password</label>
                                <input id="password-input" label="Password" name="password" value={password} onChange={(event)=>{setPassword(event.target.value);setError(null);setSuccess(null);}} type="password"/>
                            </div>
                            <input id="sign-in-button"
                                    type="submit"
                                    disabled={!username || !password}
                                    className={(!username || !password) ? '' : 'active-btn'}
                                    value="Sign In"
                                    onClick={handleSubmit} 
                            />
                        </form>
                    </div>
                </div>
                <div className="or-register-container center-content">
                    <div>
                        <span className="center-content" id="line-title2"></span>
                    </div>
                    <div id="or-div">or</div>
                    <div id="if-you-dont-div">If you don't have an account...</div>
                    <a id="register-link" href="/signup">Sign Up Here</a>
                </div>
            </div>
        </div>
    );
}

export default Splash;