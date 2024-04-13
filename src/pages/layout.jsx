import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';

/* Firebase */
import { getDatabase, ref, set, onValue } from "firebase/database";

// firebase auth imports
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
// getting auth from app.jsx
import { auth } from '../App';

// the handle google for the sign in button
const handleGoogle = async (e) => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
}

export default function Layout({ user, content }) {

  const loginButton = (
    <div className="sign-in-button" >
      <button onClick={handleGoogle}>Sign In With Google</button>
    </div >
  )

  const userIcon = (
    <a href="/profile">
      <div className="user-icon" >
        {user ? user.displayName : null}
      </div>
    </a>
  )

  return (
    <div className="App">
      <div className="header">
        <div className="menu-icon">
          {/* <FontAwesomeIcon icon={faBars} size="lg" /> */}
        </div>
        <a className="logo-text" href="/">
          CampusXChange
        </a>
        {user ? userIcon : loginButton}
      </div>

      {content}

      {/* <div className="footer">
        <footer>
          <div className="footer-icons">
            <a href="/messages"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="/marketplace"><FontAwesomeIcon icon={faStore} /></a>
            <a href="/user"><FontAwesomeIcon icon={faUser} /></a>
          </div>
        </footer>
      </div> */}

    </div>
  )
}