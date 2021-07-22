import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import NavBar from './NavBar';

function AboutUs() {
    const [backEnd, setBackEnd] = useState(localStorage.getItem('backEnd')==='micro' ? 'micro' : 'soa');

    const restart = () => {
        localStorage.setItem('token', null);
        window.location.href='/';
    }

    return (
        <div className='all-page'>
            <NavBar />
            <div style={{'paddingTop': '70px'}} />
            <Button 
                className='margin'
                variant='primary'
                onClick={()=>{
                    restart();localStorage.setItem('backEnd', backEnd==='micro' ? 'soa' : 'micro')
                }}>
                    Go to {backEnd==='micro' ? 'soa' : 'microservices'}
            </Button>
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default AboutUs;