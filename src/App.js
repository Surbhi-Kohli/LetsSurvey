import React from 'react';
import { Switch , Route } from "react-router-dom";
import Graph from './UI/HorizontalGraph';
import  CreatePoll  from './Containers/CreatePoll/CreatePoll';
import AllSurveys from './Components/AllSurveys/AllSurveys';
import SurveyForm from './Components/MySurveyForm/MySurveyForm';
import Navbar from "./UI/Navbar/Navbar";

import './App.css';

function App() {
 
  return (
    <div>
      <Navbar/>
    <Switch>
   
    <Route path="/AllSurveys/Survey/:id" exact >
      <SurveyForm/>
    </Route>

     <Route path="/AllSurveys" exact >
      <AllSurveys/>
    </Route>
    
    <Route exact path="/">
        <div className="App">
        <CreatePoll/>
        </div>
    </Route>
  </Switch>
  </div>
  );
}

export default App;
