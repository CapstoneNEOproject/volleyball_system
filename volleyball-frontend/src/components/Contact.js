import React, { useState } from 'react';
import '../PageStyles.css';
import CallImage from "../assets/call.png";
import MailImage from "../assets/mail.png";

const Contact = () => {

    return (
        <div >
            <h1>Contact Us</h1>
            <p className='feedback'>We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>
            <div className="contacts">
                <div className="contact1">
                    <h2>Brian Valore</h2>
                    <div className="contact-position">
                        <img src={MailImage} alt="call-image" className='mail-image' />
                        <h3><a href="mailto:bvman15@gmail.com" target='_blank' rel="noreferrer" >bvman15@gmail.com</a></h3>
                    </div>
                    <div className="contact-position">
                        <img src={CallImage} alt="call-image" className='call-image' />
                        <h3>(216) 401-6362</h3>
                    </div>
                </div>
                <div className="contact2">
                    <h2>Steve Colegrove</h2>
                    <div className="contact-position">
                        <img src={MailImage} alt="call-image" className='mail-image' />
                        <h3><a href="mailto:steve.neoathletics@gmail.com" target='_blank' rel="noreferrer" >steve.neoathletics@gmail.com</a></h3>
                    </div>
                    <div className="contact-position">
                        <img src={CallImage} alt="call-image" className='call-image' />
                        <h3>(216)-926-6779</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;