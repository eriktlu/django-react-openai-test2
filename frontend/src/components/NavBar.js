import React, { Component, useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBar(props) {
    return (
        <nav className="nav">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/ask-page">PageAsk</Link>
            <Link to="/chat-bot">ChatBot</Link>
          </ul>
        </nav>
      )
}