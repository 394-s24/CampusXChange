import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faEnvelope, faStore, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';

/* Firebase */
import { onValue } from "firebase/database";

export default function Layout({content}) {
    return (
        <div className="App">
            <div className="header">
                <div className="menu-icon">
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </div>
                <div className="logo-text">
                    CampusXChange
                </div>
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