import React, { Component, useState, useEffect } from "react";

const HomePage = (props) => {

    const[userText, setUserText] = useState('');
    const[formState, setFormState] = useState(false);
    const[loading, setLoading] = useState('');

    const handleTextChange = (event) => {
        setUserText(event.target.value);
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

    const generateNamesClicked = (event) => {
        event.preventDefault();
        setFormState(true)
        setLoading(true)

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
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
                var theInstructions = data;
                var F=new Function (theInstructions);

                setFormState(false)
                setLoading(false)
                return(F());
            })      
    }


    return (
        <div className="form-area">
            <h1>Make a wish:</h1>
            <form onSubmit={generateNamesClicked}>
                <input type="text" value={userText} name="animal" placeholder="Do something creative" onChange={handleTextChange} required />
                <input type="submit" value="Send" disabled={formState} />
            </form>
        </div>   
    );
}

export default HomePage;