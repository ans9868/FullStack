import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router} from "react-router-dom"; //for <Router></Router> which allows the use of useMatch

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)