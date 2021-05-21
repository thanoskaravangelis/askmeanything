import React from 'react';
import './Landing.css';
import './NewQuestion.css';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import CreatableSelect from 'react-select/creatable';
import Form from 'react-bootstrap/Form';
import Button from'react-bootstrap/Button';

class NewQuestion extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            options : [
                { value: 'HTML', label: 'HTML' },
                { value: 'CSS', label: 'CSS' },
                { value: 'NodeJS', label: 'NodeJS' }
            ]
        }
    }


    render(){
        return(
            <div className="new-question-whole">
                <NavBar />
                <div className="line-separator"></div>
                <div className="new-question-main-container">
                    <div className="add-question-container">
                        <div className="new-question-title center-content">
                            Add a New Question
                        </div>
                        <div className="new-question-form">
                            <Form id="new-q-form">
                                <Form.Group >
                                    <h4>Title</h4>
                                    <Form.Control id="new-q-title" type="text" name="new-q-title"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <h4>Question Details</h4>
                                    <Form.Control id="new-q-details" as="textarea" name="new-q-text" rows={10} cols={120}></Form.Control>
                                </Form.Group>
                                <h4>Keywords</h4>
                                <Form.Label>Select from existing ones:</Form.Label>
                                <CreatableSelect
                                    defaultValue={[this.state.options[4], this.state.options[3]]}
                                    isMulti
                                    placeholder="Select from existing or create one..."
                                    name="keywords"
                                    options={this.state.options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                                <div className="center-content">
                                    <Button id="sbmt-btn" as="input" type="submit" value="Add Question" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="footer-container">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default NewQuestion;