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

// FIRESTORE
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

/* Components */
import Chat from '../components/Chat';
import ListingItem from '../components/ListingItem'
import toast, { Toaster } from 'react-hot-toast';

import checkPost from './functions/checkPost';

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


export default function Contact({ textbookCountRef, usersCountRef, curUser, firestore }) {
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [selectedChatUserId, setSelectedChatUserId] = useState(null);
    const [profileOption, setProfileOption] = useState("Postings");
    const [activePriceFilter, setActivePriceFilter] = useState(Infinity);
    const [activeTags, setActiveTags] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);
    const [filteredItems, setFilteredItems] = useState(data);
    const [toggleNewPost, setToggleNewPost] = useState(false);
    const [authors, setAuthors] = useState([""]);
    const [tags, setTags] = useState([]);
    const [nextItemNumber, setNextItemNumber] = useState(0);

    const itemslist = filteredItems.map((item, i) => {
        return <ListingItem key={i} item={item} />
    });

    const params = useParams();
    console.log("params:", params);
    const db = getDatabase();
    const fs = getFirestore();
    const notify = () => toast('Post submitted!');
    const emptyFields = () => toast('Please fill in all fields.');


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

    function addTag(e) {
        // All buttons inside a form submit by default, so use e.preventDefault() to stop this behavior
        e.preventDefault();  // Do not let this button submit the form
        let newTags = [...tags, ""];
        setTags(newTags);
    }

    function removeTag(e) {
        e.preventDefault();
        let newTags = tags.slice(0, -1);
        setTags(newTags);
    }

    function updateTag(tagIndex, updatedName) {
        let newTags = [...tags];
        newTags[tagIndex] = updatedName;
        setTags(newTags);
    }

    function handleSubmit(e) {
        if (!checkPost(e, tags)) {
            emptyFields()
        } else {

            try {
                
                const classValue = e.target.class.value;
                const conditionValue = e.target.condition.value;
                const descriptionValue = e.target.description.value;
                const editionValue = e.target.edition.value;
                const nameValue = e.target.name.value;
                const priceValue = e.target.price.value;

                set(ref(db, `textbooks/${nextItemNumber}`), {
                    Authors: authors,  // This one is already defined as a state
                    Class: classValue,
                    Condition: conditionValue,
                    Description: descriptionValue,
                    Edition: editionValue,
                    Name: nameValue,
                    Price: parseInt(priceValue),
                    Tags: tags,
                    Uid: curUser.uid,
                    Username: curUser.displayName
                });
                notify();

                return true
            } catch {
                return false
            }
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesQuery = query(collection(fs, "messages"), where("to", "==", params.userid));
            const querySnapshot = await getDocs(messagesQuery);
            const messagesData = [];
            querySnapshot.forEach((doc) => {
                messagesData.push(doc.data());
            });
            setMessages(messagesData);
        };

        fetchMessages();
    }, []);

    const handleChatClick = (userId) => {
        setSelectedChatUserId(userId);
    };

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

    const getColorForLetter = (letter) => {
        const red = (letter * 70) % 256;
        const green = (letter * 130) % 256;
        const blue = (letter * 90) % 256;
        return `rgb(${red}, ${green}, ${blue})`;
    };

    const profileMessages = (
        <div className="messages-card">
            {/* Only display the sidebar that selects user to message if viewing own profile */}
            {(curUser.uid == params.userid) &&
                <div className="messages-list">
                    {user && curUser.uid === params.userid && (
                        <div>
                            {messages.map((message, index) => (
                                <div key={index} className="message-option" onClick={() => handleChatClick(message.uid)}>
                                    <div className="message-option-image"
                                        style={{ backgroundColor: getColorForLetter(message.name.toUpperCase().charCodeAt(0)) }}>
                                        {message.name.toUpperCase().charAt(0)}
                                    </div>
                                    <div className="message-option-used">{message.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
            {/* display all chats if viewing own profile */}
            {user && curUser.uid === params.userid && selectedChatUserId && (
                <Chat sellerId={selectedChatUserId}></Chat>
            )}

            {/* only display chat between seller and user on seller's Contact page */}
            {!selectedChatUserId && (
                <div className="message-selected">
                    <Chat sellerId={params.userid}></Chat>
                </div>
            )}

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
                    <div className="profile-photo"
                        style={{ backgroundColor: getColorForLetter(user ? (user.name ? user.name.toUpperCase().charCodeAt(0) : `rgb(240, 240, 240)`) : `rgb(240, 240, 240)`) }}>
                        {user ? (user.name ? user.name.toUpperCase().charAt(0) : "") : ""}
                    </div>
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
                                <input key={i} name={"author" + i} placeholder='Type author name here' onChange={(e) => updateAuthor(i, e.target.value)} />)
                            }
                            <div className="button-container">
                                <button onClick={addAuthor}>Add New Author</button>
                                <button onClick={removeAuthor}>Remove Author</button>
                            </div>

                            <input name="class" placeholder='Type class name here' />
                            <input name="condition" placeholder='Type condition here' />
                            <input name="description" placeholder='Type description here' />
                            <input name="edition" placeholder='Type edition here' />
                            <input name="name" placeholder='Type book name here' />
                            <input name="price" type="number" placeholder='Type price here' />

                            {/* TAGS */}
                            {tags.map((tag, i) =>
                                <input key={i} name={"tag" + i} placeholder='Enter tag here' onChange={(e) => updateTag(i, e.target.value)} />)
                            }
                            <div className="button-container">
                                <button onClick={addTag}>Add New Tag</button>
                                <button onClick={removeTag}>Remove Tag</button>
                            </div>

                            <button type="submit">Submit Posting</button>
                            <Toaster toastOptions={{
                                className: '',
                                style: {
                                    top: '50px',
                                    position: 'relative'
                                },
                            }} />
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