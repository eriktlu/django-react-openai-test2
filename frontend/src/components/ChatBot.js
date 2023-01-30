import React, { Component, useState, useEffect } from "react";
import Chat from "./Chat";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ChatBot = (props) => {

    useEffect(() => {
        document.querySelector('body').style.overflowY = 'auto';

        let tl2 = gsap.timeline({ repeat: -1, repeatDelay: 2, delay: 3});
            tl2
                .fromTo('.show-more > svg', { y: 0 }, { y: 5, duration: 1.5})
                .fromTo('.show-more > svg', { y: 5 }, { y: 3, duration: .5 })
                .fromTo('.show-more > svg', { y: 3 }, { y: 5, duration: .5 })
                .fromTo('.show-more > svg', { y: 5 }, { y: 3, duration: .5 })
                .fromTo('.show-more > svg', { y: 3 }, { y: 5, duration: .5 })
                .fromTo('.show-more > svg', { y: 5 }, { y: 0, duration: 1.5 })
                .fromTo('.show-more > svg', { y: 0 }, { y: 0, duration: 0 });

        let tl1 = gsap.timeline();
            tl1
                .fromTo('.header-title', {x: '-100vw', opacity: 0 }, {x: 0,opacity: 1, duration: .75, ease: "back.out(1.7)"})
                .fromTo('.header-descriptive', {x: '-100vw', opacity: 0 }, {x: 0, opacity: 1, duration: .5, ease: "back.out(1.2)"}, '-=.25')
                .fromTo('.header-right', {x: '100vw', opacity: 0 }, {x: 0, opacity: 1, duration: .5, ease: "back.out(1.1)"}, '-=.25')
                .fromTo('#chatButton', { scale: 0 }, { scale: 1, duration: .5, ease: "back.out(3)", delay: .5 })
                .fromTo('.show-more', { opacity: 0 }, { opacity: 1, duration: .5, delay: .5})
                .add(tl2);

        gsap.fromTo('.who-we-are', { opacity: 0, x: '-100vw' }, { x: 0, opacity: 1, duration: 1, scrollTrigger: '.who-we-are' })
        gsap.fromTo('.our-services', { opacity: 0, x: '100vw' }, { x: 0, opacity: 1, duration: 1, scrollTrigger: '.our-services' })
        gsap.fromTo('.pricing', { opacity: 0, x: '-100vw' }, { x: 0, opacity: 1, duration: 1, scrollTrigger: '.pricing' })

        
    }, []);

    const scrollDown = () => {
        window.scrollTo(0, window.innerHeight);
    }

    return (
        <div>
            <div className="header container">
                <div className="header-left">
                    <h1 className="header-title">PixelPro Web Solutions</h1>
                    <p className="header-descriptive">
                        Building your online presence, one pixel at a time.
                    </p>
                </div>
                <div className="header-right">
                    {/* <img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /> */}
                    <div className="circles">
                        <div></div>
                        <div></div>
                        <div></div>
                        <span></span>
                    </div>
                </div>
                <div className="show-more" onClick={scrollDown}>
                    <ExpandMoreIcon />
                </div>
                
            </div>
            <div className="text-content">

                <div className="who-we-are content-block">
                    <div className="container">
                        <div className="block-left"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                        <div className="block-right">
                            <h3 className="secondary-header">Who are We?</h3>
                            <p className="content-desc">At PixelPro Web Solutions, we are a team of highly skilled and experienced web developers who are dedicated to delivering exceptional results and providing our clients with the best possible service. We specialize in creating custom web applications from scratch using the latest technologies such as React for the frontend and Django for the backend. Our goal is to help businesses and individuals take their online presence to the next level by providing them with a unique and fully functional website tailored to their specific requirements. With years of experience and a proven track record of success, you can trust us to turn your web development dreams into reality.</p>
                        </div>
                    </div>
                </div>

                <div className="our-services secondary-block content-block">
                    <div className="container">
                        <h3 className="secondary-header">Our Services</h3>
                        <p className="content-desc">At PixelPro Web Solutions, we offer a wide range of web development services to help businesses and individuals take their online presence to the next level. Our services include:</p>
                        <ul className="services">
                            <li className="service">
                                <div className="service-container">
                                    <div className="services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span>Website design and development</span>
                                    <a href="/">Learn More</a>
                                </div>
                            </li>
                            <li className="service">
                                <div className="service-container">
                                    <div className="services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span>E-commerce solutions</span>
                                    <a href="/">Learn More</a>
                                </div>
                            </li>
                            <li className="service">
                                <div className="service-container">
                                    <div className="services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span>Custom web applications</span>
                                    <a href="/">Learn More</a>
                                </div>
                            </li>
                            <li className="service">
                                <div className="service-container">
                                    <div className="services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span>Web maintenance and updates</span>
                                    <a href="/">Learn More</a>
                                </div>
                            </li>
                            <li className="service">
                                <div className="service-container">
                                    <div className="services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span>Search engine optimization (SEO)</span>
                                    <a href="/">Learn More</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                
                
                <div className="pricing secondary-block content-block">
                    <div className="container">
                        <h3 className="secondary-header">Pricing</h3>
                        <p className="content-desc">At PixelPro Web Solutions, we understand that every client has unique needs and budget constraints. That's why we offer flexible pricing options to fit your specific project and budget. Our prices are based on the complexity of the project, the technologies used, and the time required to complete the project. Here are some rough estimates for our services:</p>
                        <ul className="prices services">
                            <li className="price service">
                                <div className="price-container">
                                    <div className="prices-image services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span><div>Website design and development</div></span>
                                    <span><div className="price-starting">Starting at <b>$3000</b></div></span>
                                    <a href="/"><div>Learn More</div></a>
                                </div>
                            </li>
                            <li className="price service">
                                <div className="price-container">
                                    <div className="prices-image services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span><div>E-commerce solutions</div></span>
                                    <span><div className="price-starting">Starting at <b>$5000</b></div></span>
                                    <a href="/"><div>Learn More</div></a>
                                </div>
                            </li>
                            <li className="price service">
                                <div className="price-container">
                                    <div className="prices-image services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span><div>Custom web applications</div></span>
                                    <span><div className="price-starting">Starting at <b>$3000</b></div></span>
                                    <a href="/"><div>Learn More</div></a>
                                </div>
                            </li>
                            <li className="price service">
                                <div className="price-container">
                                    <div className="prices-image services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span><div>Web maintenance and updates</div></span>
                                    <span><div className="price-starting">Starting at <b>$500</b> per month</div></span>
                                    <a href="/"><div>Learn More</div></a>
                                </div>
                            </li>
                            <li className="price service">
                                <div className="price-container">
                                    <div className="prices-image services-image"><img src="static\images\atom-svgrepo-com.svg" alt="" width="800px" height="800px" /></div>
                                    <span><div>Search engine optimization (SEO)</div></span>
                                    <span><div className="price-starting">Starting at <b>$1000</b> per month</div></span>
                                    <a href="/"><div>Learn More</div></a>
                                </div>
                            </li>
                        </ul>
                        <p className="content-desc">We believe in being transparent with our clients and will provide you with a detailed proposal outlining the scope of the project and the cost before we begin any work. We also offer ongoing maintenance and support packages to ensure your website stays up to date and runs smoothly. Contact us today to schedule a consultation and receive a personalized quote for your project.</p>
                    </div>
                </div>
            </div>

            <Chat />
        </div>
    );
}

export default ChatBot;