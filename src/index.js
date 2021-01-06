import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Switch,Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import './index.css';

import 'semantic-ui-css/semantic.min.css'
import App from './App';
//import * as config from./firebase.js/index.json"; 

import * as serviceWorker from './serviceWorker';
import reducer from "./store/reducers/pollForm";


//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,applyMiddleware(thunk));
console.log(store);

const app=(<Provider store={store}>
           <Router><App/></Router>
            </Provider>);
ReactDOM.render(app,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
