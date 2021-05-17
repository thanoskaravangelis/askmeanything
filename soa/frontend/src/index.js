import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Splash from './Splash.js';
import Landing from'./Landing.js';
import SignUp from "./SignUp";
import NewQuestion from"./NewQuestion";
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact>
          <Splash />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/newquestion">
          <NewQuestion />
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
