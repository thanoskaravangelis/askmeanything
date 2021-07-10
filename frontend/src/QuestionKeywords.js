import React, { useState, useEffect } from 'react';


function OneKeyword(props) {
    const [keyword, setKeyword] = useState(props.keyword);
    
    useEffect(()=>{
        setKeyword(props.keyword);
    }, [props.keyword]);

    return(
        <a className="keyword-div" href={`/keywords/${keyword.id}`}>
            {keyword.name}
        </a>
    )
}

function QuestionKeywords(props) {
    const [keywords, setKeywords] = useState(props.keywords);
    
    useEffect(()=>{
        setKeywords(props.keywords);
    }, [props.keywords]);

    return(
        <div className = "question-div-keywords">
            {keywords.map((value, index) => {
                return (
                    <OneKeyword key={index} keyword={value.keyword} />
                )})
            }
        </div>
    )
}

export default QuestionKeywords;