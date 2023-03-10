import React, { Component, useState, useEffect } from "react";
import Loader from './Loader.js';

const PageAsk = (props) => {
    const[website, setWebsite] = useState('');
    const[userText, setUserText] = useState('');
    const[formState, setFormState] = useState(false);
    const[loading, setLoading] = useState(false);
    const[result, setResult] = useState('');
    const[csrftoken, setCsrftoken] = useState('');

    const handleTextChange = (event) => {
        setUserText(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    const moveBox = () => {
        gsap.to('.box-up', { duration: 1.5, ease: "elastic.out(1, 0.4)", y: -200 });
    }
    
    const textIn = () => {
        gsap.fromTo('.result', { x: '-100%', opacity: 0, ease: 'power1.out'}, { duration: 1, x: '0', opacity: 1 })
    }
    
    const textOut = () => {
        gsap.to('.result', { duration: 1, x: '100vw', opacity: 0, ease: 'power1.out'})
    }

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
        let timeline = gsap.timeline({ defaults: { duration: 1 }})
        timeline
            .fromTo('.form-area', { y: '100vh'}, { y: 0, ease: 'elastic.out(1, 0.4)', duration: 1 })

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

    const generateResult = (event) => {
        event.preventDefault();
        setFormState(true)
        setLoading(true)
        textOut()
        moveBox()

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                user_text: userText,
                website_url: website,
            }),
        };

        setUserText('');
        setWebsite('');

        fetch("/api/generate-website-ask-response", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFormState(false);
                setLoading(false);
                setResult(data);
                textIn();
                return;
            }) 


    }


    return (
        <div>
            <div className="form-area box-up">
                <h1>Ask a Site:</h1>
                <form onSubmit={generateResult}>
                    <input type="text" value={website} name="website" placeholder="https://en.wikipedia.org/wiki/Pepe_the_Frog" onChange={handleWebsiteChange} required />
                    <input type="text" value={userText} name="question" placeholder="Who created Pepe the Frog?" onChange={handleTextChange} required />
                    <input type="submit" value="Send" disabled={formState} />
                    <Loader />
                </form>
            </div>

            <div className="result container">
                <p>{result}</p>
            </div>
        </div>   
    );
}

export default PageAsk;