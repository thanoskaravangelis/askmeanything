import React from 'react';
import './Footer.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
    return (
        <Navbar 
                variant="light"
                expand="lg"
                fixed='bottom'
                style={{ backgroundColor : 'rgb(200, 200, 200)'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{'width': '20vw'}} href="/aboutus">About</Nav.Link>
                    <Nav.Link style={{'width': '20vw'}} href="/contact">Contact us</Nav.Link>
                    <Nav.Link style={{'width': '20vw'}} href="/">Documentation</Nav.Link>
                    <Nav.Link style={{'width': '20vw'}} href="https://github.com/thanoskaravangelis/saas-80"
                            rel='noopener noreferrer' target='_blank'>
                        Github
                    </Nav.Link>
                    <Nav.Link style={{'width': '20vw'}} href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34"
                            rel='noopener noreferrer' target='_blank'>
                        Course Materials
                    </Nav.Link>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Footer;