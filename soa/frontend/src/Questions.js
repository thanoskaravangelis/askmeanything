import React from 'react';
import './Landing.css';
import './Questions.css'
import NavBar from'./NavBar.js';
import Footer from './Footer.js';
import Pagination from 'react-bootstrap/Pagination'

class Questions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            questions : [{
                id: 1,
                title: "How to write CSS classes?",
                text: "I have an issue writing on a @media tag in CSS. What is the proper syntax for that?",
                createdAt: "2021-05-12 20:39:43.870089",
                keywords: [
                    {
                        id:1,
                        name: "css"
                    },
                    {
                        id:33,
                        name: "python"
                    }
                ],
                upvotes: 22,
                downvotes : 0
            },
            {
                id: 2,
                title: "How to write Java classes?",
                text: "I have an issue creating a class in Java. What is the proper syntax for that?",
                createdAt: "2021-07-12 20:39:43.870089",
                keywords: [
                    {
                        id:1,
                        name: "css"
                    },
                    {
                        id:33,
                        name: "python"
                    }
                ],
                upvotes: 22,
                downvotes : 0
            }]
        }
    }

    render() {
        return (
            <div className="questions-main-container center-content">
                <NavBar />
                <div className="line-separator"></div>
                <div className="questions-main-div">
                    <div className="questions-title center-content">
                        Questions
                    </div>
                    <div className="allQuestions">
                    {this.state.questions.map((question) => {
                        return (
                            <div className = "question-div">
                                <div className= "question-div-title">{question.title}</div>
                                <div className= "question-div-details">
                                    <div className = "question-div-keywords">{question.keywords.map((keyword) => {return (
                                        <div className="keyword-div">{keyword.name}</div>)})}
                                    </div>
                                    <div className="question-div-date-who">asked by <a className="profile-href" href="/questions">thanosblv</a> on 17:34 05-06-2021</div>
                                </div>
                                <div className="line-separator"></div>
                            </div>
                        );
                    })}
                    </div>
                </div>
                <div className="pagin-div center-content">
                    <div className="pagination-container center-content">
                        <Pagination>
                            <Pagination.First/>
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                </div>
                <div className="footer-page-container">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Questions;