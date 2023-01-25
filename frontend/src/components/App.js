import React from 'react';
import { Route, Routes } from "react-router-dom"

import HomePage from "./HomePage";
import NavBar from "./NavBar";
import PageAsk from "./PageAsk"
import ChatBot from './ChatBot';

const App = () => {
    return (
        <div className="container">

            <NavBar />

            <div className="center">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ask-page" element={<PageAsk />} />
                    <Route path="/chat-bot" element={<ChatBot />} />
                </Routes>
                
            </div>
        </div>
    );
}

export default App;