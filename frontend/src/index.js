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
const FindQuestion = () => {
  const { id } = useParams();
  return <AnswerQuestion id={ id } />;
}

const FindUser = () => {
  const { id } = useParams();
  return <Profile id={ id } />;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact>
          <Splash />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/ask">
          <NewQuestion />
        </Route>
        <Route path='/questions/:id'>
          <FindQuestion />
        </Route>
        <Route path="/questions">
          <Home />
        </Route>
        <Route path='/users/:id'>
          <FindUser />
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
