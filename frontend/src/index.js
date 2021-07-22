import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, useParams} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Splash from './Splash.js';
import Landing from'./Landing.js';
import SignUp from "./SignUp";
import NewQuestion from"./NewQuestion";
import Home from './Home';
import AnswerQuestion from './AnswerQuestion';
import Profile from './Profile';
import KeywordAnalytics from './KeywordAnalytics';
import OneKeywordAnalytics from './OneKeywordAnalytics';
import AllStats from './AllStats';
import MyQuestions from './MyQuestions';
import MyAnswered from './MyAnswered';
import AboutUs from './AboutUs';

const FindQuestion = () => {
  const { id } = useParams();
  return <AnswerQuestion id={ id } />;
}

const FindUser = () => {
  const { id } = useParams();
  return <Profile id={ id } />;
}

const FindKeyword = () => {
  const { name } = useParams();
  return <OneKeywordAnalytics name={name} page={true} />;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact>
          <Splash />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/ask" exact>
          <NewQuestion />
        </Route>
        <Route path='/answers/my' exact>
          <MyAnswered />
        </Route>
        <Route path='/questions/my' exact>
          <MyQuestions />
        </Route>
        <Route path='/questions/:id' exact>
          <FindQuestion />
        </Route>
        <Route path="/questions" exact>
          <Home />
        </Route>
        <Route path='/users/:id' exact>
          <FindUser />
        </Route>
        <Route path='/keywords/:name' exact>
          <FindKeyword />
        </Route>
        <Route path='/keywords'exact >
          <KeywordAnalytics />
        </Route>
        <Route path='/stats' exact>
          <AllStats />
        </Route>
        <Route path='/aboutus' exact>
          <AboutUs />
        </Route>
        <Route path='/my' exact>
          <Landing case='my' />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
