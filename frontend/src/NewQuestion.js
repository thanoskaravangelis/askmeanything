import React, { useState, useEffect } from 'react';
import './Landing.css';
import './NewQuestion.css';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import CreatableSelect from 'react-select/creatable';
import Form from 'react-bootstrap/Form';
import Button from'react-bootstrap/Button';
import { attachKeyword, getKeywords, postKeyword, isLogged, postQuestion } from './api';

function NewQuestion() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [picked, setPicked] = useState([]);
    const [userId, setUserId] = useState(null);
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        isLogged()
        .then(response => {
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
            window.location.href='/';
        })
        getKeywords()
        .then(response => {
            console.log(response);
            const temp = [];
            for (let keyword of response.data) {
                temp.push({
                    value: keyword.id,
                    label: keyword.name,
                });
            }
            setKeywords(temp);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const attach = (keyword_id, question_id) => {
        attachKeyword(keyword_id, question_id)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const attachNewKeyword = (name, question_id) => {
        postKeyword(name)
        .then(response => {
            console.log(response);
            const id = response.data.id;
            attach(id, question_id);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const submit = (event) => {
        event.preventDefault();
        if (!title || !text) {
            setErr('Fill all the compulsory fields.');
            window.scrollTo({
                top:0,
                left:0,
                behavior:'smooth'
            });
        }
        else {
            const obj = { 
                text,
                title,
                user: {
                    id: userId
                }
            };
            postQuestion(obj)
            .then( async (response) => {
                const id = response.data.id;
                for (let keyword of picked) {
                    if (keyword.__isNew__)  await attachNewKeyword(keyword.label, id);
                    else await attach(keyword.value, id);
                }
                setSuccess('Question posted successfully.');
                setErr(null);
                window.scrollTo({
                    top:0,
                    left:0,
                    behavior:'smooth'
                });
                setTimeout(()=>{window.location.href=`/questions/${id}`}, 300);
            })
            .catch(err => {
                console.log(err);
                setErr('Sorry, we could not publish your question.');
                window.scrollTo({
                    top:0,
                    left:0,
                    behavior:'smooth'
                });
            })
        }

    }

    return(
        <div className="new-question-whole">
            <NavBar />
            <div className="line-separator"></div>
            <div style={{'paddingBottom': '100px', 'marginTop': '10px'}}>
                    <h4 className="new-question-title">
                        Add a New Question
                    </h4>
                    <div style={{'color': 'red'}}>{err}</div>
                    <div style={{'color': 'green'}}>{success}</div>
                    <div>
                        <Form id="new-q-form" onSubmit={submit}>
                            <Form.Group >
                                <h5>Title</h5>
                                <Form.Control id="new-q-title" 
                                              type="text"
                                              name="title"
                                              value={title}
                                              onChange={(event)=>{setTitle(event.target.value)}}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <h5>Question Details</h5>
                                <Form.Control id="new-q-details"
                                              as="textarea"
                                              name="text"
                                              rows={10}
                                              cols={120}
                                              value={text}
                                              onChange={(event)=>{setText(event.target.value)}}>
                                </Form.Control>
                            </Form.Group>
                            <h5>Keywords</h5>
                            <div style={{'height': '200px'}}>
                            <Form.Label>Select from existing ones:</Form.Label>
                            <CreatableSelect
                                isMulti
                                placeholder="Select from existing or create one..."
                                name="keywords"
                                options={keywords}
                                value={picked}
                                onChange={(event)=>{console.log(event);setPicked(event);}}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            </div>
                            <div className="center-content">
                                <Button id="sbmt-btn" as="input" type="submit" value="Add Question" onClick={submit} />
                            </div>
                        </Form>
                    </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewQuestion;