import React, { Component, useState, useEffect } from "react";

const PageAsk = (props) => {
    const[website, setWebsite] = useState('');
    const[userText, setUserText] = useState('');
    const[formState, setFormState] = useState(false);
    const[loading, setLoading] = useState(false);
    const[result, setResult] = useState('');

    const handleTextChange = (event) => {
        setUserText(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    useEffect(() => {
        if (loading) {
            addLoader();
        }
        if (!loading) {
            if(document.getElementById('loader')){
                document.getElementById('loader').remove();
            }
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
            headers: { 'Content-Type': 'application/json' },
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
                </form>
            </div>

            <div className="result">
                <p>{result}</p>
            </div>
        </div>   
    );
}

export default PageAsk;