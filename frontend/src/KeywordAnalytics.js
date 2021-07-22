import React, { useState, useEffect } from 'react';
import { getKeywords, keywordsStats } from './api';
import Footer from './Footer';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import OneKeywordAnalytics from './OneKeywordAnalytics';
import Pie from './Pie';

function KeywordsPie() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        keywordsStats()
        .then(response => {
            console.log(response);
            const res = response.data;
            const temp = [];
            let sum = 0;
            for (let obj of res) {
                sum += parseInt(obj.amount);
            }
            for (let obj of res) {
                temp.push({
                    label: obj.name,
                    y: Math.round((parseInt(obj.amount)/sum)*10000)/100,
                })
            }
            setStats(temp);
        })
    }, [])

    if (stats.length) {
        return(
            <Pie data={stats} title='Questions per keyword' />
        )
    }

    else {
        return (
            null
        )
    }
}


function KeywordAnalytics() {
    const [keywords, setKeywords] = useState([]);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        getKeywords()
        .then(response => {
            console.log(response.data);
            setKeywords(response.data);
            setCurrent(response.data[0].name);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return(
        <div className='all-page'>
            <NavBar />
            <div style={{'paddingTop': '70px', 'paddingBottom': '100px'}}>
                {!keywords.length &&
                    <div style={{'color': 'red'}}>No keywords found.</div>
                }
                {keywords.length &&
                    <KeywordsPie />
                }
                {keywords.length && 
                    <h5>Pick a keyword to see its questions</h5>
                }
                <div class='flex'>
                    {keywords.length &&
                        keywords.map((value, index) => {
                            return(
                                <Button key={index}
                                        className='margin'
                                        variant={(value.name===current ? 'success': 'primary')}
                                        onClick={()=>{setCurrent(value.name)}}>
                                    {value.name}
                                </Button>
                            )
                        })
                    }
                </div>
                <div style={{'marginTop': '15px'}} />
                <OneKeywordAnalytics name={current} />
            </div>
            <Footer />
        </div>
    )
}

export default KeywordAnalytics;