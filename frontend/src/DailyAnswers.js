import React, { useState, useEffect } from 'react';
import { answersDaily } from './api';
import Pie from './Pie';

function DailyAnswers() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        answersDaily()
        .then(response => {
            console.log(response.data);
            const answers = response.data;
            let sum = 0;
            const temp = [];
            for (let obj of answers) {
                sum+=parseInt(obj.answers);
            }
            for (let obj of answers) {
                temp.push({
                    label: obj.day,
                    y: Math.round((parseInt(obj.answers)/sum)*10000)/100,
                })
            }
            setStats(temp);
        })
    }, [])
    if (!stats.length) {
        return (
            <div style={{'color': 'red'}}>No answers found.</div>
        )
    }
    else {
        return (
            <Pie data={stats} title={'Daily Answers'} />
        )    
    }

}

export default DailyAnswers;