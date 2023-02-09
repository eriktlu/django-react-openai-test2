import React from 'react';
import { Route, Routes } from "react-router-dom"

import HomePage from "./HomePage";
import NavBar from "./NavBar";
import PageAsk from "./PageAsk"
import ChatBot from './ChatBot';
import DocumentReader from './DocumentReader';
import PTLAudio from './PTLAudio';

const App = () => {
    return (
        <div className='appBox'>

            <NavBar />

            <div className="center">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ask-page" element={<PageAsk />} />
                    <Route path="/chat-bot" element={<ChatBot />} />
                    <Route path="/document-read" element={<DocumentReader />} />
                    <Route path="/ptl-audio" element={<PTLAudio />} />
                </Routes>
                
            </div>
        </div>
    );
}

export default App;