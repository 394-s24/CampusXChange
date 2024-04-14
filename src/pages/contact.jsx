import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import './contact.css'

import { useParams } from "react-router-dom";

// import emailjs from '@emailjs/browser';

/* Firebase */
import { onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";

/* Components */
import Message from '../components/Message';

const signOutButton = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signed out");
    }).catch((error) => {
        // An error happened.
        console.log("ERROR: ", error);
    });

    // redirect to home page
}

export default function Contact({ usersCountRef }) {
    const [user, setUser] = useState();
    const params = useParams();

    console.log(params)

    // onValue(usersCountRef, (snapshot) => {
    //     setUser(snapshot.val());
    // });
    
    console.log(user)

    return (
        <div className="contact-wrapper">
            <div className="profile-photo"></div>
            <div>{user ? user.displayName : ""}</div>
            <div>{user ? user.email : ""}</div>
            {user ? (user.phoneNumber ? <div>{user.phoneNumber}</div> : null) : null}

            <a href="/">
                <button onClick={signOutButton}>Sign Out</button>
            </a>
            <Message></Message>

        </div>
    )
}