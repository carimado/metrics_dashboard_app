import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router basename='metrics-dashboard-app'>
        <App />
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// heyo! good luck to yall with everything! its been fun :) keep pushing and keep learning. lmk if anyones down for a beer in sydney, we all deserve it. feel free to add me on linkedin! https://www.linkedin.com/in/carimado/