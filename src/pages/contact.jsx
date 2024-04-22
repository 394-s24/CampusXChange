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
    const [profileOption, setProfileOption] = useState("Postings");
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

    const profilePostings = (
        <>
            {user ? (curUser.uid == params.userid ? <div className="postings-options">
                <div className="postings-option">
                    New Post
                </div>
            </div> : null) : null}
            <div>No Postings</div>
        </>
    )

    const profileMessages = (
        <div className="messages-card">
            <div className="messages-list">
                <div className="message-option">
                    <div className="message-option-image">

                    </div>
                    <div className="message-option-used">
                        Jason Bourne
                    </div>
                </div>
                <div className="message-option">
                    <div className="message-option-image">

                    </div>
                    <div className="message-option-used">
                        John Wick
                    </div>
                </div>
            </div>
            <div className="message-selected">
                No Message Selected
            </div>
        </div>
    )

    const profileSettings = (
        "Settings"
    )

    const selectedProfileOption = {
        "Postings": profilePostings,
        "Messages": profileMessages,
        "Settings": profileSettings
    }

    return (
        <div className="contact-wrapper">
            <div className="profile-info">
                <div className="profile-card">
                    <div className="profile-photo"></div>
                    <div className="profile-name">{user ? user.name : ""}</div>
                    <div className="profile-email">{user ? user.email : ""}</div>
                    {user ? (user.phoneNumber ? <div className="profile-number">{user.phoneNumber}</div> : null) : null}
                </div>

                <div className="profile-card">
                    <div className="profile-option" onClick={() => setProfileOption("Postings")}>
                        Postings
                    </div>
                    {user ? (curUser.uid == params.userid ? <div className="profile-option" onClick={() => setProfileOption("Messages")}>
                        Messages
                    </div> : null) : null}
                    {user ? (curUser.uid == params.userid ? <div className="profile-option" onClick={() => setProfileOption("Settings")}>
                        Settings
                    </div> : null) : null}
                    {user ? (curUser.uid == params.userid ? <a href="/" className="profile-option"> <div className="profile-signout" onClick={signOutButton}>Sign Out</div> </a> : null) : null}
                </div>
            </div>
            <div className="profile-content">
                <div className="profile-content-label">
                    {profileOption}
                </div>
                <br />
                {selectedProfileOption[profileOption]}
            </div>
        </div>
    )
}