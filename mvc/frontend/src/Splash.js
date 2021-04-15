import React from 'react';
import './Splash.css';


class Splash extends React.Component {
    
    /*constructor(props){

    }*/

    render(){
        return(
            <div className="main-splash-container center-content">
                <div className="title-container">askmeanything</div>
                <div>
                    <span className="center-content" id="line-title"></span>
                </div>
                <div className="login-container center-content">
                    <div className="center-content">
                        <form>
                            <div className="login-form">
                                <label id="username-label" for="Username">Username</label>
                                <input id="username-input" label="Username" name="username" type="text"/>
                                <label id="password-label" for="Password">Password</label>
                                <input id="password-input" label="Password" name="password" type="password"/>
                            </div>
                            <input id="sign-in-button" type="submit" value="Sign In"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;