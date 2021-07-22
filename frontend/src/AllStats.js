import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import DailyAnswers from './DailyAnswers';
import DailyQuestions from './DailyQuestions';
import MonthlyAnswers from './MonthlyAnswers';
import MonthlyQuestions from './MonthlyQuestions';

function AllStats() {
    return (
        <div className='all-page'>
            <NavBar />
            <div style={{'paddingTop': '70px'}} />
            <div className='flex'>
                <DailyQuestions />
                <DailyAnswers />
                <MonthlyQuestions />
                <MonthlyAnswers />
            </div>
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default AllStats;