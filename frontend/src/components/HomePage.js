import React, { Component, useState, useEffect } from "react";
import Loader from './Loader.js';

const HomePage = (props) => {

    const[userText, setUserText] = useState('');
    const[formState, setFormState] = useState(false);
    const[loading, setLoading] = useState('');
    const[csrftoken, setCsrftoken] = useState('');

    const handleTextChange = (event) => {
        setUserText(event.target.value);
    };

    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden';
        gsap.fromTo('.form-area', { opacity: 0}, { opacity: 1, duration: 5 })
        setCsrftoken(getCookie('csrftoken'));
    }, []);

    useEffect(() => {
        if (loading) {
            document.querySelector('.loader').style.visibility = 'visible';
        }
        if (!loading) {
            document.querySelector('.loader').style.visibility = 'hidden';
        }
    }, [loading]);

    const generateNamesClicked = (event) => {
        event.preventDefault();
        setFormState(true)
        setLoading(true)

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                user_text: userText,
            }),
        };

        setUserText('')

        fetch("/api/generate-response", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // let script = '<script type="text/javascript">console.log("Hello")</script>'
                // document.body.append(script);
                // console.log(response);
                console.log(data);
                var theInstructions = data;
                var F=new Function (theInstructions);

                setFormState(false)
                setLoading(false)
                return(F());
            })      
    }


    return (
        <div>
            <div className="form-area">
                <h1>Make a wish:</h1>
                <form onSubmit={generateNamesClicked}>
                    <input type="text" value={userText} name="animal" placeholder="Do something creative" onChange={handleTextChange} required />
                    <input type="submit" value="Send" disabled={formState} />
                    <Loader />
                </form>
            </div>
            <div id="ai-response"></div>
        </div>
           
    );
}

export default HomePage;