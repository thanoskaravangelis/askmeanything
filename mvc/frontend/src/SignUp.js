import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            submitOff:true
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {
            [name]: value
        })
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
                            <div className="title-text">askmeanything</div>
                        </div>
                        <div>
                            <span className="center-content" id="line-title"></span>
                        </div>
                        <div className="signup-container center-content">
                            <div className="center-content">
                                <form>
                                    <div className="signup-form">
                                        <label className="signup-label">email</label>
                                                <input id="signup-email" type="email" value={this.state.email} onChange={this.state.handleInput}/>                          
                                            <label className="signup-label">Username</label>
                                                <input id="sgnp-username" type="text" value={this.state.username} onChange={this.state.handleInput}/>                          
                                            <label className="signup-label">Password</label>
                                                <input id="sgnp-password" type="password" value={this.state.password} onChange={this.state.handleInput}/>                          
                                            <label className="signup-label">Re-enter Password</label>
                                                <input id="sgnp-password-again" type="password" value={this.state.password} onChange={this.state.handleInput}/>                          
                                    </div>
                                    <input id="sign-up-button" type="submit" disabled={this.state.submitOff} value="Sign Up" onClick={this.handleSubmit}/>
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