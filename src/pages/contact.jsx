import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import './contact.css'

// import emailjs from '@emailjs/browser';

/* Firebase */
import { onValue } from "firebase/database";

export default function Contact({ user, textbookCountRef }) {
    return (
        <div className="contact-wrapper">
            <div className="profile-photo"></div>
            <div>{user.displayName}</div>
            <div>{user.email}</div>
            {user.phoneNumber ? <div>{user.phoneNumber}</div> : null}
        </div>
    )
}