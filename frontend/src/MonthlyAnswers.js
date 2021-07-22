import React, { useState, useEffect } from 'react';
import { answersMonthly } from './api';
import Line from './Line';

function MonthlyAnswers() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        answersMonthly()
        .then(response => {
            console.log(response.data);
            const answers = response.data;
            const temp = [];
            for (let obj of response.data) {
                const currDate = obj.month.split('-');
                temp.push({
                    x: new Date(currDate[0], currDate[1], 1),
                    y: parseInt(obj.answers),
                });
            }
            setStats(temp);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    if (!stats.length) {
        return (
            <div style={{'color': 'red'}}>No answers found.</div>
        )
    }
    else {
        return (
            <Line data={stats} title={'Monthly Answers'} />
        )    
    }
}

export default MonthlyAnswers;