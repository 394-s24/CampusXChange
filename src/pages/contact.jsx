import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import './contact.css'

import { useParams } from "react-router-dom";

// import emailjs from '@emailjs/browser';

/* Firebase */
import { onValue } from "firebase/database";
import { getDatabase, ref, get, set } from "firebase/database";
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

export default function Contact({ usersCountRef, curUser }) {
    const [user, setUser] = useState();
    const params = useParams();

    console.log(params)

    const db = getDatabase();

    useEffect(() => {
        get(ref(db, `users/` + params.userid)).then((snapshot) => {
            if (snapshot.exists()) {
                setUser(snapshot.val());
            }
            else {
                setUser(null);
            }
        }).catch((error) => {
            console.error(error);
        })
    }, []);
    

    return (
        <div className="contact-wrapper">
            <div className="profile-photo"></div>
            <div>{user ? user.name : ""}</div>
            <div>{user ? user.email : ""}</div>
            {user ? (user.phoneNumber ? <div>{user.phoneNumber}</div> : null) : null}
            {user ? (curUser.uid == params.userid ? <a href="/"> <button onClick={signOutButton}>Sign Out</button> </a> : null) : null}
            <Message></Message>

        </div>
    )
}