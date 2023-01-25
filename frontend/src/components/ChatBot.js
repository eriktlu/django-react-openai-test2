import React, { Component, useState, useEffect } from "react";
import Chat from "./Chat";

const ChatBot = (props) => {

    useEffect(() => {
        document.querySelector('body').style.overflow = 'auto';
    }, []);

    return (
        <div>
            <div class="header">
                <div class="header-left">
                    <h1 class="header-title">PixelPro Web Solutions</h1>
                    <p class="header-descriptive">
                        Building your online presence, one pixel at a time.
                    </p>
                </div>
                <div class="header-right">

                </div>
            </div>
            <div class="text-content">
                <div class="who-we-are">
                    <p>At PixelPro Web Solutions, we are a team of highly skilled and experienced web developers who are dedicated to delivering exceptional results and providing our clients with the best possible service. We specialize in creating custom web applications from scratch using the latest technologies such as React for the frontend and Django for the backend. Our goal is to help businesses and individuals take their online presence to the next level by providing them with a unique and fully functional website tailored to their specific requirements. With years of experience and a proven track record of success, you can trust us to turn your web development dreams into reality.</p>
                </div>
                <div class="our-services">
                    <p>At PixelPro Web Solutions, we offer a wide range of web development services to help businesses and individuals take their online presence to the next level. Our services include:</p>
                    <ul>
                        <li>Website design and development</li>
                        <li>E-commerce solutions</li>
                        <li>Custom web applications</li>
                        <li>Web maintenance and updates</li>
                        <li>Search engine optimization (SEO)</li>
                    </ul>
                    <p>Our team of highly skilled web developers is committed to delivering exceptional results and providing our clients with the best possible service. Whether you're looking to create a new website or update an existing one, we have the experience and expertise to help you achieve your goals.</p>
                </div>
                <div class="pricing">
                    <p>At PixelPro Web Solutions, we understand that every client has unique needs and budget constraints. That's why we offer flexible pricing options to fit your specific project and budget. Our prices are based on the complexity of the project, the technologies used, and the time required to complete the project.</p>
                    <p>Here are some rough estimates for our services:</p>
                    <ul>
                        <li>Website design and development: Starting at $3000</li>
                        <li>E-commerce solutions: Starting at $5000</li>
                        <li>Custom web applications: Starting at $7000</li>
                        <li>Web maintenance and updates: Starting at $500 per month</li>
                        <li>Search engine optimization (SEO): Starting at $1000 per month</li>
                    </ul>
                    <p>We believe in being transparent with our clients and will provide you with a detailed proposal outlining the scope of the project and the cost before we begin any work. We also offer ongoing maintenance and support packages to ensure your website stays up to date and runs smoothly. Contact us today to schedule a consultation and receive a personalized quote for your project.</p>
                </div>
            </div>

            <Chat />
        </div>
    );
}

export default ChatBot;