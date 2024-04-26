import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const MessageBubble = ({ message, sellerId }) => {
    const [user] = useAuthState(getAuth());

    // only display messages between seller and user
    console.log(sellerId)
    if (!(message.uid == user.uid) && !(message.uid == sellerId)) {
        return null;
    }

    return (
        <div>
          <div>
            <p><b>{message.name}</b>: {message.text}</p>
          </div>
        </div>
      );
    };

export default MessageBubble;
