import React, { useState } from 'react';
import './Message.css';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
/* Firebase */
import { app, auth, db, firestore } from '../firebase';

export function isValidMessage(msg) {
  return msg.length > 0;
}

const Message = ({sellerId}) => {
    const [message, setMessage] = useState("");

    const send = async (message) => {
        if (!isValidMessage(msg)) {
          return false
        }

        const { uid, displayName } = auth.currentUser;
        await addDoc(collection(firestore, "messages"), {
            name: displayName,
            to: sellerId,
            text: message,
            createdAt: serverTimestamp(),
            uid,
            
        });
        setMessage("");
        return true
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