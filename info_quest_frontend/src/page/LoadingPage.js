import logo from "../logo.svg";
import './App.css';
import React from "react";

const LoadingPage = () => {
    return (
        <div className="LoadingPage">
            <img src={logo} className="App-logo" alt="logo"/>
        </div>
    )
}

export default LoadingPage;