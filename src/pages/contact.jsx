import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import './contact.css'

// import emailjs from '@emailjs/browser';

/* Firebase */
import { onValue } from "firebase/database";

export default function Contact({ textbookCountRef }) {
    return (
        <div className="contact-wrapper">
            <div>Hong Zhou</div>

            {/* <p>Contact the seller here</p> */}

            <form action="mailto:solaniosassyboi@gmail.com" method="post" className="contact-form"> 
                <label>Email solaniosassyboi@gmail.com:</label>
                <textarea name="message" placeholder='Type your message here'/>

                <button type="submit">Send</button> 
            </form>
            
        </div>
    )
}