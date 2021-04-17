import React from 'react';
import './Footer.css';
import gitlogo from './images/GitHub-Mark-64px.png';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.gitRedirect=this.gitRedirect.bind(this);
    }

    gitRedirect = (e) => {
        window.location.href='https://github.com/thanoskaravangelis/saas-80';
    }

    render() {
        return(
            <div className="footer-container">
                <a className="footer-link">About</a>
                <a className="footer-link">Contact Us</a>
                <a className="footer-link">Project Documentation</a>
                <div className="git-find-us center-content">
                    <img id="git-logo" src={gitlogo} height="25px" onClick={this.gitRedirect}/>
                    <a className="footer-link" id="git-footer-link" href="https://github.com/thanoskaravangelis/saas-80">Find us on GitHub</a>
                </div>
                <a className="footer-link">Course materials</a>
            </div>
        );      
    }
}

export default Footer;