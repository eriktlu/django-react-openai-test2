import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const HomePage = (props) => {

    const[userText, setUserText] = useState('');
    const[response, setResponse] = useState('');

    const handleTextChange = (event) => {
        setUserText(event.target.value);
    };

    const handleResponse = (event) => {

    }

    const generateNamesClicked = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_text: userText,
            }),
        };

        let i;

        fetch("/api/generate-response", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setResponse(data);
                // let script = '<script type="text/javascript">console.log("Hello")</script>'
                // document.body.append(script);
                // console.log(response);
                var theInstructions = data;
                var F=new Function (theInstructions);
                return(F());
            })      
    }

    const renderHomePage = () => {
        return (
            <div>
                <h1>Make a wish:</h1>
                <form onSubmit={generateNamesClicked}>
                    <input type="text" name="animal" placeholder="Create a red ball with up and down bouncing animation.." onChange={handleTextChange} required />
                    <input type="submit" value="Send" />
                </form>
            </div>   
        );
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={renderHomePage()}/>
            </Routes>
        </Router>
    );
}

export default HomePage;