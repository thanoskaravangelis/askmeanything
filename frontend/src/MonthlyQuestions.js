import React, { useState, useEffect } from 'react';
import { questionsMonthly } from './api';
import Line from './Line';

function MonthlyQuestions() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        questionsMonthly()
        .then(response => {
            console.log(response.data);
            const questions = response.data;
            const temp = [];
            for (let obj of response.data) {
                const currDate = obj.month.split('-');
                temp.push({
                    x: new Date(currDate[0], currDate[1], 1),
                    y: parseInt(obj.questions),
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
            <div style={{'color': 'red'}}>No questions found.</div>
        )
    }
    else {
        return (
            <Line data={stats} title={'Monthly Questions'} />
        )    
    }



}

export default MonthlyQuestions;