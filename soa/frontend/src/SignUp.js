import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            firstName:"",
            lastName:"",
            dateOfBirth:"",
            country:"",
            url:"",
            userId:null,
            logged:false,
            submitOff:true
        }
        this.handleInput = this.handleInput.bind(this);
        this.homeRedirect = this.homeRedirect.bind(this);
        this.showBasicForm = this.showBasicForm.bind(this);
        this.showNextForm = this.showNextForm.bind(this);
        this.showFinalForm = this.showFinalForm.bind(this);
        this.backToSecond = this.backToSecond.bind(this);
    }

    componentDidMount(){
        const signupcont = document.getElementById("final-form-buttons");
        const secondForm = document.getElementsByClassName("second-form");
        signupcont.style.display = 'none';
        secondForm[0].style.display = 'none';
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {
            [name]: value
        })
    }
    
    handleSubmit = (e) => {
        console.log("submitted");
        window.location.href = "/";
        e.preventDefault();
    }

    formActive = (e) => {
        const signupbtn = document.getElementById("signup-button");
        if(this.state.username==="" || this.state.password==="" || this.state.password2==="" || this.state.email==="") {
            console.log("Cannot sign up due to missing mandatory fields.");
            this.setState({
                submitOff:true
            });
        }
        else{
            console.log("submit-activated");
            this.setState({
                submitOff:false
            });
        }
        e.preventDefault();
    }

    showBasicForm = (e) => {
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

    showNextForm = (e) => {
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

    backToSecond = (e) => {
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

    showFinalForm = (e) => {
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

    homeRedirect = (e) => {
        window.location.href = "/";
    }

    render() {
        if(this.state.logged) {
            window.location.href = "/" ;
        }
        else{
            return(
                <div className="basic-container">
                    <div className="main-splash-container center-content">
                        <div id="logo"></div>
                        <div className="title-container center-content">
                            <div className="title-text" onClick={this.homeRedirect}>askmeanything</div>
                        </div>
                        <div>
                            <span className="center-content" id="line-title"></span>
                        </div>
                        <div className="signup-container center-content">
                            <div className="center-content">
                                <form id="signup-form">
                                    <div className="first-form">
                                        <div className="signup-form">
                                            <label className="signup-label" id="email-label">Email</label>
                                            <input className="signup-field" id="signup-email" name="email" type="email" value={this.state.email} onChange={this.handleInput} onKeyUp={this.formActive}/>                          
                                            <label className="signup-label" id="username-sgnp-label">Username</label>
                                            <input className="signup-field" id="signup-username" name="username" type="text" value={this.state.username} onChange={this.handleInput} onKeyUp={this.formActive}/>                          
                                            <label className="signup-label" id="password-sgnp-label">Password</label>
                                            <input className="signup-field" id="signup-password" name="password" type="password" value={this.state.password} onChange={this.handleInput} onKeyUp={this.formActive}/>                          
                                            <label className="signup-label" id="re-password-label">Re-enter Password</label>
                                            <input className="signup-field" id="signup-re-password" name="password2" type="password" value={this.state.password2} onChange={this.handleInput} onKeyUp={this.formActive}/>                          
                                        </div>
                                        <div id="next-form-container">
                                            <div className="next-button">
                                                <div id="next-form-button" className="center-content" onClick={this.showNextForm}>Next</div>
                                            </div>
                                        </div>
                                        <div id="final-form-buttons">
                                            <input id="signup-btn" type="submit" disabled={this.state.submitOff} value="Sign Up" onClick={this.handleSubmit}/>
                                            <div className="skip-button">
                                                <div id="back-button" className="center-content" onClick={this.backToSecond}>Back</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="second-form">
                                        <p>Tell us more about you, or skip this step.</p>
                                        <div className="more-signup-form">
                                            <label className="signup-label" id="firstname-label" name="firstName">First Name</label>
                                            <input className="signup-field" id="signup-firstname"  name="firstName" type="text" value={this.state.firstName} onChange={this.handleInput}/>
                                            <label className="signup-label" id="lastname-label">Last Name</label>
                                            <input className="signup-field" id="signup-lastname"  name="lastName" type="text" value={this.state.lastName} onChange={this.handleInput}/> 
                                            <label className="signup-label" id="dateofbirth-label">Date of Birth</label>
                                            <input className="signup-field" id="signup-dateofbirth" name="dateOfBirth" type="date" value={this.state.dateOfBirth} onChange={this.handleInput}/>     
                                            <label className="signup-label" id="country-label" >Country</label>
                                            <input className="signup-field" id="signup-country" name="country" type="text" value={this.state.country} onChange={this.handleInput}/>
                                            <label className="signup-label" id="url-label" >Personal URL</label>
                                            <input className="signup-field" id="signup-url" name="url" type="url" value={this.state.peronalUrl} onChange={this.handleInput}/>    
                                        </div>
                                        <div id="skip-form-container">
                                            <div className="skip-button">
                                                <div id="back-to-basic" className="center-content" onClick={this.showBasicForm}>Back</div>
                                                <div id="skip-form-button" className="center-content" onClick={this.showFinalForm}>Skip</div>
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
    }
}

export default SignUp;