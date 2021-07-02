import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider}from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import {reducers} from "./Reducers";
import './index.css';


const store=createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <App />
  
  </Provider>,
  document.getElementById('root')
);



