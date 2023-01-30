import React, { Component, useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBar(props) {

    useEffect(() => {
      let timeline = gsap.timeline({ defaults: { duration: 1 }})
      timeline
          .fromTo('.nav ul a', { opacity: 0}, { opacity: 1, stagger: .5 })
    }, []);

    return (
        <nav className="nav container">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/ask-page">PageAsk</Link>
            <Link to="/chat-bot">ChatBot</Link>
            <Link to="/document-read">DocumentReader</Link>
          </ul>
        </nav>
      )
}