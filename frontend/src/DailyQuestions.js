import React, { useState, useEffect } from 'react';
import { questionsDaily } from './api';
import Pie from './Pie';

function DailyQuestions() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        questionsDaily()
        .then(response => {
            console.log(response.data);
            const questions = response.data;
            let sum = 0;
            const temp = [];
            for (let obj of questions) {
                sum+=parseInt(obj.questions);
            }
            for (let obj of questions) {
                temp.push({
                    label: obj.day,
                    y: Math.round((parseInt(obj.questions)/sum)*10000)/100,
                })
            }
            setStats(temp);
        })
    }, [])
    if (!stats.length) {
        return (
            <div style={{'color': 'red'}}>No questions found.</div>
        )
    }
    else {
        return (
            <Pie data={stats} title={'Daily Questions'} />
        )    
    }

}

export default DailyQuestions;