import React, { useState } from 'react';
import './Message.css';
import { auth } from '../App';
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
/* Firebase */
import { initializeApp } from "firebase/app";

// Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyDfg5GzgVZFceNSIyv36G_s8r9D-HEpo3k",
//     authDomain: "campus-xchange.firebaseapp.com",
//     databaseURL: "https://campus-xchange-default-rtdb.firebaseio.com",
//     projectId: "campus-xchange",
//     storageBucket: "campus-xchange.appspot.com",
//     messagingSenderId: "517180626197",
//     appId: "1:517180626197:web:abdcd3e001261317dc451c",
//     measurementId: "G-P455SCVKCZ"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyArOEMm9_9B8_7_QdgozYJtAtDvHqxlldI",
  authDomain: "campusxchange-633a6.firebaseapp.com",
  projectId: "campusxchange-633a6",
  storageBucket: "campusxchange-633a6.appspot.com",
  messagingSenderId: "1038793350652",
  appId: "1:1038793350652:web:9b376b768866b9214b6679"
};
  
// initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const Message = ({sellerId}) => {
    const [message, setMessage] = useState("");

    const send = async (event) => {
        event.preventDefault();
        const { uid, displayName } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            name: displayName,
            to: sellerId,
            text: message,
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
          placeholder="send a message :)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="msg-input"
        />
        <button type="submit" className="msg-send-button">Send</button>
      </form>
    );
  };

  export default Message;