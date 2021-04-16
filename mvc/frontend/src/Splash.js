import React from 'react';
import './Splash.css';


class Splash extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            submitOff: true,
            userId:null,
            logged:false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formActive = this.formActive.bind(this);
    }

    componentDidMount() {
        const signinbut = document.getElementById("sign-in-button");
        signinbut.style.color='rgb(0, 0, 0)';
        signinbut.style.backgroundColor='rgb(243, 243, 243)';
    }

    handleSubmit = (e) => {
        console.log("submitted");
        this.setState({
            error: null
        });
        window.location.href = "/";
        e.preventDefault();
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {
            [name]: value
        })
    }

    formActive = (e) => {
        const signinbut = document.getElementById("sign-in-button");
        if (this.state.username==null || this.state.password==null) {
            console.log("Cannot sign in due to missing fields.");
            signinbut.classList.remove('active-btn');
            signinbut.style.color='rgb(0, 0, 0)';
            signinbut.style.backgroundColor='rgb(243, 243, 243)';
            this.setState({
                submitOff:true
            });
        }
        else{
            if (this.state.username.length===0 || this.state.password.length===0) {
                console.log("Cannot sign in due to missing fields.");
                signinbut.classList.remove('active-btn');
                signinbut.style.color='rgb(0, 0, 0)';
                signinbut.style.backgroundColor='rgb(243, 243, 243)';
                this.setState({
                    submitOff:true
                });
            }
            else 
            {
                signinbut.style.color='';
                signinbut.style.backgroundColor='';
                signinbut.classList.add('active-btn');
                console.log("submit activated");
                this.setState({
                    submitOff:false
                });
            }
        }
        e.preventDefault();
    }

    render(){
        if(this.state.logged) {
            window.location.href = "/" ;
        }
        else{
            return(
                <div className="basic-container">
                    <div className="main-splash-container center-content">
                        <div id="logo"></div>
                        <div className="title-container center-content">
                            <div className="title-text">askmeanything</div>
                        </div>
                        <div>
                            <span className="center-content" id="line-title"></span>
                        </div>
                        <div className="login-container center-content">
                            <div id="form-container" className="center-content">
                                <form>
                                    <div className="login-form">
                                        <label id="username-label">Username</label>
                                        <input id="username-input" label="Username" name="username" value={this.state.username} onChange={this.handleInput} onKeyUp={this.formActive} type="text"/>
                                        <label id="password-label">Password</label>
                                        <input id="password-input" label="Password" name="password" value={this.state.password} onChange={this.handleInput} onKeyUp={this.formActive} type="password"/>
                                    </div>
                                    <input id="sign-in-button" type="submit" disabled={this.state.submitOff} value="Sign In" onClick={this.handleSubmit} />
                                </form>
                            </div>
                        </div>
                        <div className="or-register-container center-content">
                            <div>
                                <span className="center-content" id="line-title2"></span>
                            </div>
                            <div id="or-div">or</div>
                            <div id="if-you-dont-div">If you don't have an account...</div>
                            <a id="register-link" href="/">Sign Up Here</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Splash;