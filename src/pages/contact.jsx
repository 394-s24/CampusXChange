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
import Chat from '../components/Chat';
import ListingItem from '../components/ListingItem'

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

export default function Contact({ textbookCountRef, usersCountRef, curUser }) {
    const [user, setUser] = useState();
    const [profileOption, setProfileOption] = useState("Postings");
    const [activePriceFilter, setActivePriceFilter] = useState(Infinity);
    const [activeTags, setActiveTags] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);
    const [filteredItems, setFilteredItems] = useState(data);

    const itemslist = filteredItems.map(item => {
        return <ListingItem item={item} />
    });

    const params = useParams();

    console.log("params: ", params);

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

    useEffect(() => {
        // retrieve data from firebase realtime db
        onValue(textbookCountRef, (snapshot) => {
            setData(snapshot.val());
        });

        // min might not be used for now, but I wanted to make this function more general
        let filtered = data.filter(item => item.Price <= activePriceFilter);

        // Get post by this user
        filtered = filtered.filter(item => item.Uid === params.userid)

        // filter by tags
        // if no tags selected do not do anything
        if (activeTags.length > 0) {
            let temp = [];
            activeTags.forEach(tag => {
                temp = [...temp, ...filtered.filter(item => item.Tags.includes(tag))];
            });

            filtered = temp;
        }
        if (searchValue.length > 0) {
            // non case-sensitive
            filtered = filtered.filter(item => item.Name.toLowerCase().includes(searchValue.toLowerCase()))
        }

        setFilteredItems(filtered);
    }, [searchValue, activePriceFilter, activeTags, data])

    const profilePostings = (
        <>
            {user ? (curUser.uid == params.userid ? <div className="postings-options">
                <div className="postings-option">
                    New Post
                </div>
            </div> : null) : null}
            <div className="items-wrapper">
                {filteredItems.length > 0 ? itemslist : "No Posting"}
            </div>
        </>
    )

    const profileMessages = (
        <div className="messages-card">
            {/* Only display the sidebar that selects user to message if viewing own profile */}
            {(curUser.uid == params.userid) &&
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

                    <div className="message-option">
                        <div className="message-option-image">

                        </div>
                        <div className="message-option-used">
                            Rachel Yao
                        </div>
                    </div>

                </div>
            }

            <div className="message-selected">
                {/* No Message Selected */}
                <Chat sellerId={params.userid}></Chat>
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
                    {/* {user ? (curUser.uid == params.userid ? <div className="profile-option" onClick={() => setProfileOption("Messages")}>
                        Messages
                    </div> : null) : null} */}
                    {/* Display Messages tab on the seller's profile too*/}
                    {user ? (
                        <div className="profile-option" onClick={() => setProfileOption("Messages")}>
                            Messages
                        </div>) : null}

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