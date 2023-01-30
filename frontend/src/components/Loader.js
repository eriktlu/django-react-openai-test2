import React, { Component, useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';

const Chat = (props) => {

    useEffect(() => {
        
        //animate first circle
        let tl = new TimelineMax({repeat: -1});
        tl.set("#c1", {autoAlpha:.7})
        .to("#c1", .5, {scale: .2, x: "+=5", transformOrigin:"50% 50%"})
        .to("#c1", .5, {scale:1, x: "-=5",transformOrigin:"50% 50%"} );

        //animate second circle
        let tl2 = new TimelineMax({repeat: -1});
        tl2.set("#c2", {autoAlpha:.7})
        .to("#c2", .5, {scale: .2, x: "-=5",transformOrigin:"50% 50%"})
        .to("#c2", .5, {scale:1, x: "+=5",transformOrigin:"50% 50%"} )
      }, []);
    
    return (
        <div className="loader">
            <svg viewBox="0 0 16 16" version="1.1" style={{ width: '30px', height: '16px' }}
            xmlns="http://www.w3.org/2000/svg">
                <circle id="c1" cx="8" cy='8' r="8" style={{fill: '#29B6F6'}} />
                <circle id="c2" cx="14" cy='8' r="8" style={{fill: '#FF4081'}} />
            </svg>
            <div className="txt-loading">LOADING</div>
        </div>
      )
}

export default Chat;