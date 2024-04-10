import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';

/* Firebase */
import { onValue } from "firebase/database";





// firebase auth imports
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// getting auth from app.jsx
import {auth} from '../App';
// the handle google for the sign in button
const handleGoogle = async (e) => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth,provider)
  }

  
export default function Layout({content}) {
    return (
        <div className="App">
            <div className="header">
              <div className = "sign-in-button">
                <button onClick={handleGoogle}>Sign In With Google</button>
              </div>
                <div className="menu-icon">
                    {/* <FontAwesomeIcon icon={faBars} size="lg" /> */}
                </div>
                <a className="logo-text" href="/">
                    CampusXChange
                </a>
                <div className="filter-icon" >
                </div>
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