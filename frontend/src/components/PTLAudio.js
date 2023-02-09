import React, { Component, useState, useEffect } from "react";
import Loader from './Loader.js';

import RecorderControls from "./RecorderControls.js";
import useRecorder from "./useRecorder.js";

import useRecordingsList from "../hooks/useRecordingsList";

const PTLAudio = (props) => {
    const { recorderState, ...handlers } = useRecorder();
    const { audio } = recorderState;
    const[loading, setLoading] = useState(false);
    const[formState, setFormState] = useState(false);
    const[result, setResult] = useState('');
    const[recURL, setRecURL] = useState('');

    let currentChar = 0
    let text = ''
    // const { recordings } = useRecordingsList(audio);

    const createURL = () => {
        return setRecURL(window.URL.createObjectURL(audio));
    }
    
    const textIn = () => {
        gsap.fromTo('.result', { x: '-100%', opacity: 0, ease: 'power1.out'}, { duration: 1, x: '0', opacity: 1 })
    }
    
    const textOut = () => {
        gsap.to('.result', { duration: 1, x: '100vw', opacity: 0, ease: 'power1.out'})
    }

    const write = () => {
        var el = document.getElementById('result');
        // console.log(text.charAt(currentChar))
        el.textContent += text.charAt(currentChar);
        currentChar++
        if(currentChar < text.length) setTimeout(write, 40);
    }

    useEffect(() => {
        let timeline = gsap.timeline({ defaults: { duration: 1 }})
        timeline
            .fromTo('.form-area', { y: '100vh'}, { y: 0, ease: 'elastic.out(1, 0.4)', duration: 1, yPercent: -50 })
    }, []);

    useEffect(() => {
        // console.log(audio)
        setLoading(true);
        setFormState(true);
        currentChar = 0;

        if (audio){
            createURL()
            let data = new FormData();
            data.append('audio', audio, 'audio_file');

            const requestOptions = {
                method: "POST",
                body: data,
            };

            // console.log(data)

            fetch("/api/generate-audio-transcription", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    setFormState(false);
                    setLoading(false);
                    text = data;
                    document.getElementById('result').textContent += ' ';
                    write();
                    return;
                }) 
        }

        
    }, [audio])

    return (
        <section className="voice-recorder">
            <div className="form-area box-up">
                <h1 className="title">Voice Recorder</h1>
                <div className="recorder-container">
                    <RecorderControls recorderState={recorderState} handlers={handlers} />
                </div>
            </div>
            
            <div className='container result'>
                <p id="result"></p>
                {/* <audio controls src={recURL}></audio> */}
            </div>
        </section>
    );
}

export default PTLAudio;