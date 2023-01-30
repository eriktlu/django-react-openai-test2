import React, { Component, useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import Loader from './Loader.js';
import Loader2 from "./Loader2.js";

const Chat = (props) => {
    const[question, setQuestion] = useState('');
    const[formState, setFormState] = useState(false);
    const[chatOpen, setChatOpen] = useState(false);
    const[csrftoken, setCsrftoken] = useState('');
    const[loading, setLoading] = useState(false);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const scrollToBottom = () => {
        let objDiv = document.getElementsByClassName('chat-messages')[0];
        objDiv.scrollTo(0, objDiv.scrollHeight);
        console.log(objDiv.scrollHeight);
    }

    const addUserQuestion = () => {
        const messageBox = document.getElementById('chatField');
        messageBox.innerHTML += `<span class="chat-question chat-message">${question}</span>`;
        scrollToBottom()
    };

    const addAnswer = (answer) => {
        const messageBox = document.getElementById('chatField');
        messageBox.innerHTML += `<span class="chat-answer chat-message">${answer}</span>`;
        scrollToBottom()
    };

    const chatToggle = () => {
        if(chatOpen){
            gsap.fromTo('#chat', { scale: '1'}, { duration: .25, scale: '0' })
            gsap.fromTo('#chatButton', { scale: '0'}, { duration: .25, scale: '1', delay: .25, ease: "back.out(1.7)"})
            setChatOpen(false);
        } else {
            gsap.fromTo('#chatButton', { scale: '1'}, { duration: .25, scale: '0' })
            gsap.fromTo('#chat', { scale: '0'}, { duration: .25, scale: '1'})
            setChatOpen(true);
        }
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
        setCsrftoken(getCookie('csrftoken'));
    }, []);

    useEffect(() => {
        if (loading) {
            document.querySelector('.loading').style.visibility = 'visible';
        }
        if (!loading) {
            document.querySelector('.loading').style.visibility = 'hidden';
        }
    }, [loading]);

    const generateResponse = (event) => {
        event.preventDefault();
        setLoading(true);
        setFormState(true);

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                question: question,
            }),
        };

        setQuestion('');
        addUserQuestion()

        fetch("/api/generate-chat-response", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                addAnswer(data);
                setFormState(false);
                setLoading(false);
                return;
            }) 
    };
    
    return (
        <div>
            <div id="chatButton" onClick={chatToggle}><ChatIcon /></div>
            <div id="chat">
                <div className="chat-header">
                    <h4>Chat Bot</h4>
                    <div id="chatClose" onClick={chatToggle}><CloseIcon /></div>
                </div>
                <div className="chat-body">
                    <div className="chat-messages">
                        <div id="chatField"></div>
                        <Loader2 />
                    </div>
                    <div className="chat-submit">
                        <form onSubmit={generateResponse}>
                            <input type="text" name="chatQuestion" value={question} placeholder="What is your qualification?" onChange={handleQuestionChange} required />
                            <input type="submit" value="Send" disabled={formState} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Chat;