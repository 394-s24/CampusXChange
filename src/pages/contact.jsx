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
    const [toggleNewPost, setToggleNewPost] = useState(false);
    const [authors, setAuthors] = useState([""]);
    const [nextItemNumber, setNextItemNumber] = useState(0);

    const itemslist = filteredItems.map((item, i) => {
        return <ListingItem key={i} item={item} />
    });

    const params = useParams();
    const db = getDatabase();

    function addAuthor(e) {
        // All buttons inside a form submit by default, so use e.preventDefault() to stop this behavior
        e.preventDefault();  // Do not let this button submit the form
        let newAuthors = [...authors, ""];
        setAuthors(newAuthors);
    }

    function removeAuthor(e) {
        e.preventDefault();
        let newAuthors = authors.slice(0, -1);
        setAuthors(newAuthors);
    }

    function updateAuthor(authorIndex, updatedName) {
        let newAuthors = [...authors];
        newAuthors[authorIndex] = updatedName;
        setAuthors(newAuthors);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const classValue = e.target.class.value;
        const conditionValue = e.target.condition.value;
        const descriptionValue = e.target.description.value;
        const editionValue = e.target.edition.value;
        const nameValue = e.target.name.value;
        const priceValue = e.target.price.value;
        const tagsValue = e.target.tags.value;
        
        set(ref(db, `textbooks/${nextItemNumber}`), {
            Authors: authors,  // This one is already defined as a state
            Class: classValue,
            Condition: conditionValue,
            Description: descriptionValue,
            Edition: editionValue,
            Name: nameValue,
            Price: parseInt(priceValue),
            Tags: [tagsValue],
            Uid: curUser.uid,
            Username: curUser.displayName
        });
    }

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
        // onValue(textbookCountRef, (snapshot) => {
        //     setData(snapshot.val());
        // });
        get(ref(db, "textbooks/")).then(snapshot => {
            setData(snapshot.val());
            setNextItemNumber(snapshot.val().length);
        })

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
            <div className="postings-options">
                {user ? (curUser.uid == params.userid ? <div className="postings-options">
                    <div className="postings-option" onClick={() => setToggleNewPost(!toggleNewPost)}>
                        New Post
                    </div>

                    {/* <div className='item-details-exit' onClick={() => toggleDetails("")}>
                        x
                    </div> */}
                </div> : null) : null}
                <div className="search-bar-wrapper">
                    <div className="search-bar">
                        <input className="search-input"
                            name=""
                            onChange={(event) => setSearchValue(event.target.value)}
                            placeholder="Search for an item"
                        />
                    </div>
                    <div style={{ "width": "1rem" }} />
                </div>
            </div>

            {filteredItems.length > 0 ?
                <div className="items-wrapper">
                    {itemslist}
                </div> :
                "No Postings"
            }
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

                    {/* {user ? (curUser.uid == params.userid ? <div className="profile-option" onClick={() => setProfileOption("Settings")}>
                        Settings
                    </div> : null) : null} */}
                    {user ? (curUser.uid == params.userid ? <a href="/" className="profile-option"> <div className="profile-signout" onClick={signOutButton}>Sign Out</div> </a> : null) : null}
                </div>
            </div>
            <div className="profile-content">

                {toggleNewPost &&
                    <div className="new-post-popup">
                        <div className="new-post-popup-exit" onClick={() => setToggleNewPost(false)}>
                            x
                        </div>

                        <h2> Create New Post </h2>

                        <form onSubmit={(e) => handleSubmit(e)}>
                            {/* AUTHORS */}
                            {authors.map((author, i) =>
                                <input key = {i} name={"author" + i} placeholder='Type author name here' onChange={(e) => updateAuthor(i, e.target.value)} />)
                            }
                            <button onClick={addAuthor}>Add New Author</button>
                            <button onClick={removeAuthor}>Remove Author</button>

                            <input name="class" placeholder='Type class name here' />
                            <input name="condition" placeholder='Type condition here' />
                            <input name="description" placeholder='Type description here' />
                            <input name="edition" placeholder='Type edition here' />
                            <input name="name" placeholder='Type book name here' />
                            <input name="price" type="number" placeholder='Type price here' />

                            {/* TAGS */}
                            <input id="tags" placeholder='Enter a tag here' />

                            <button type="submit">Submit Posting</button>
                        </form>
                    </div>
                }

                <div className="profile-content-label">
                    {profileOption}
                </div>
                <br />
                {selectedProfileOption[profileOption]}
            </div>
        </div>
    )
}