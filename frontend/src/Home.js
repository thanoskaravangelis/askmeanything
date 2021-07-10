import React, { useState, useEffect } from 'react';
import './Landing.css';
import './Questions.css'
import NavBar from'./NavBar.js';
import Footer from './Footer.js';
import Questions from './Questions';

function Home() {
    return (
        <div className="all-page">
            <NavBar />
            <div className="line-separator" />
            <Questions />
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
    
}

export default Home;