import React, { useState } from 'react';
import { auth } from '../App';
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
/* Firebase */
import { initializeApp } from "firebase/app";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDfg5GzgVZFceNSIyv36G_s8r9D-HEpo3k",
    authDomain: "campus-xchange.firebaseapp.com",
    databaseURL: "https://campus-xchange-default-rtdb.firebaseio.com",
    projectId: "campus-xchange",
    storageBucket: "campus-xchange.appspot.com",
    messagingSenderId: "517180626197",
    appId: "1:517180626197:web:abdcd3e001261317dc451c",
    measurementId: "G-P455SCVKCZ"
  };
  
// initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const Message = () => {
    const [message, setMessage] = useState("");

    const send = async (event) => {
        event.preventDefault();
        const { uid, displayName } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            createdAt: serverTimestamp(),
            uid,
        });
        setMessage("");
      };

    return (
      <form onSubmit={(event) => send(event)} className="msg">
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input
          type="text"
          placeholder="type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    );
  };

  export default Message;