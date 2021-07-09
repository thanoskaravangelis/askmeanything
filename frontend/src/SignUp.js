import React, { useState, useEffect } from 'react';
import { isLogged, loginPost, signup } from './api';
import './SignUp.css';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [country, setCountry] = useState("");
    const [url, setUrl] = useState("");
    const [submitOff, setSubmitOff] = useState(true);
    const [firstFormErr, setFirstFormErr] = useState("Fill mandatory fields");
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            console.log(response);
            window.location.href = '/';
        })
        .catch(err => {
            console.log(err);
            const signupcont = document.getElementById("final-form-buttons");
            const secondForm = document.getElementsByClassName("second-form");
            signupcont.style.display = 'none';
            secondForm[0].style.display = 'none';    
        })
    }, [])

    const handleSubmit = (e) => {
        console.log("submitted");
        e.preventDefault();
        const obj = {
            username,
            password,
            email,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth || null,
            link1: url,
            country,
        }
        signup(obj)
        .then(response => {
            console.log(response);
            loginPost(username, password)
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                setSuccess('Registered successfully.');
                setFirstFormErr(null);
                setTimeout(()=>{window.location.href='/'}, 300);
            })
            .catch(err => {
                console.log(err);
                setFirstFormErr('Account was created, but something went wrong afterwards. Please, try logging in with your credentials.');
            })
        })
    }

    const formActive = () => {
        if(username==="" || password==="" || confirmation==="" || email==="") {
            setFirstFormErr("Fill mandatory fields");
            setSuccess(null);
            setSubmitOff(true);
        }
        else{
            if (password!==confirmation) {
                setFirstFormErr('Passwords don\'t match');
                setSuccess(null);
                setSubmitOff(true);
            }
            else {
                setFirstFormErr(null);
                setSuccess(null);
                setSubmitOff(false);    
            }
        }
    }

    const showBasicForm = () => {
        const firstForm = document.getElementsByClassName("first-form");
        const secondForm = document.getElementsByClassName("second-form");
        const signupcont = document.getElementById("final-form-buttons");
        document.getElementById('next-form-container').style.display = 'block';
        signupcont.style.display = 'none';

        secondForm[0].classList.remove('second-form-appearing');
        secondForm[0].className = "second-form";
        secondForm[0].classList.add('second-form-back');

        setTimeout(() => {
            secondForm[0].style.display = 'none';
            firstForm[0].style.display='block';
            firstForm[0].className="first-form";
            firstForm[0].classList.add('first-form-back');
        }, 500);
    }

    const showNextForm = () => {
            const firstForm = document.getElementsByClassName("first-form");
            const secondForm = document.getElementsByClassName("second-form");
            
            firstForm[0].className = "first-form";
            firstForm[0].classList.add("first-form-leaving");
    
            setTimeout(() => {
                firstForm[0].style.display='none';
                secondForm[0].style.removeProperty('display');
                secondForm[0].className = "second-form";
                secondForm[0].classList.add("second-form-appearing");
            }, 500);    
    }

    const backToSecond = () => {
        const firstForm = document.getElementsByClassName("first-form");
        const secondForm = document.getElementsByClassName("second-form");
        
        firstForm[0].style.removeProperty('display');
        firstForm[0].className = "first-form";
        firstForm[0].classList.add('final-form-back');
        
        setTimeout(() => {
            firstForm[0].style.display='none';
            secondForm[0].style.display = 'block';
            secondForm[0].className = "second-form";
            secondForm[0].classList.add("second-form-again");
        }, 500);

    }

    const showFinalForm = () => {
        const firstForm = document.getElementsByClassName("first-form");
        const secondForm = document.getElementsByClassName("second-form");
        const signupcont = document.getElementById("final-form-buttons");
        
        secondForm[0].style.removeProperty('display');
        secondForm[0].className = "second-form";
        secondForm[0].classList.add('second-form-leaving');
        
        setTimeout(() => {
            firstForm[0].className = "first-form";
            document.getElementById('next-form-container').style.display = 'none';
            signupcont.style.display = 'block';
            firstForm[0].style.display='block';
            firstForm[0].classList.add('final-form-arriving');
            secondForm[0].style.display='none';
        }, 200);
    }

    return(
        <div className="basic-container">
            <div className="main-splash-container center-content">
                <div id="logo"></div>
                <div className="title-container center-content">
                    <div className="title-text" onClick={()=>{window.location.href='/';}}>askmeanything</div>
                </div>
                <div>
                    <span className="center-content" id="line-title"></span>
                </div>
                <div className="signup-container center-content">
                    <div className="center-content">
                        <div style={{'color': 'red'}}>{firstFormErr}</div>
                        <div style={{'color': 'green'}}>{success}</div>

                        <form id="signup-form">
                            <div className="first-form">
                                <div className="signup-form">
                                    <label className="signup-label" id="email-label">Email</label>
                                    <input className="signup-field" id="signup-email" name="email" type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} onKeyUp={formActive}/>                          
                                    <label className="signup-label" id="username-sgnp-label">Username</label>
                                    <input className="signup-field" id="signup-username" name="username" type="text" value={username} onChange={(event)=>{setUsername(event.target.value)}} onKeyUp={formActive}/>                          
                                    <label className="signup-label" id="password-sgnp-label">Password</label>
                                    <input className="signup-field" id="signup-password" name="password" type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} onKeyUp={formActive}/>                          
                                    <label className="signup-label" id="re-password-label">Re-enter Password</label>
                                    <input className="signup-field" id="signup-re-password" name="confirmation" type="password" value={confirmation} onChange={(event)=>{setConfirmation(event.target.value)}} onKeyUp={formActive}/>                          
                                </div>
                                {!firstFormErr &&
                                    <div id="next-form-container">
                                        <div className="next-button">
                                            <div id="next-form-button" className="center-content" onClick={showNextForm}>Next</div>
                                        </div>
                                    </div>
                                }
                                <div id="final-form-buttons">
                                    <input id="signup-btn" type="submit" disabled={submitOff} value="Sign Up" onClick={handleSubmit}/>
                                    <div className="skip-button">
                                        <div id="back-button" className="center-content" onClick={backToSecond}>Back</div>
                                    </div>
                                </div>
                            </div>
                            <div className="second-form">
                                <p>Tell us more about you, or skip this step.</p>
                                <div className="more-signup-form">
                                    <label className="signup-label" id="firstname-label" name="firstName">First Name</label>
                                    <input className="signup-field" id="signup-firstname"  name="firstName" type="text" value={firstName} onChange={(event)=>setFirstName(event.target.value)}/>
                                    <label className="signup-label" id="lastname-label">Last Name</label>
                                    <input className="signup-field" id="signup-lastname"  name="lastName" type="text" value={lastName} onChange={(event)=>setLastName(event.target.value)}/> 
                                    <label className="signup-label" id="dateofbirth-label">Date of Birth</label>
                                    <input className="signup-field" id="signup-dateofbirth" name="dateOfBirth" type="date" value={dateOfBirth} onChange={(event)=>setDateOfBirth(event.target.value)}/>     
                                    <label className="signup-label" id="country-label" >Country</label>
                                    <input className="signup-field" id="signup-country" name="country" type="text" value={country} onChange={(event)=>setCountry(event.target.value)}/>
                                    <label className="signup-label" id="url-label" >Personal URL</label>
                                    <input className="signup-field" id="signup-url" name="url" type="url" value={url} onChange={(event)=>setUrl(event.target.value)}/>    
                                </div>
                                <div id="skip-form-container">
                                    <div className="skip-button">
                                        <div id="back-to-basic" className="center-content" onClick={showBasicForm}>Back</div>
                                        <div id="skip-form-button" className="center-content" onClick={showFinalForm}>Move On</div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;