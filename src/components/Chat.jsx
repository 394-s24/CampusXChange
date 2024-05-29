import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { app, auth, db, firestore } from '../firebase';
import Message from "./Message";
import MessageBubble from "./MessageBubble";

const Chat = ( {sellerId} ) => {
    const [messages, setMessages] = useState([]);

    // query firestore for 20 msgs at a time
    useEffect(() => {
        const q = query(
            collection(firestore, "messages"),
            orderBy("createdAt", "desc"),
            limit(20)
        );

        // get firestore realtime updates - listen to document
        const unsub = onSnapshot(q, (QuerySnapshot) => {
            const fetched = [];
            QuerySnapshot.forEach((doc) => {
              fetched.push({ ...doc.data(), id: doc.id });
            });
            const sorted = fetched.sort(
              (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sorted);
          });
          return () => unsub;
        }, []);

        return (
            <main>
              <div className="message-container">
                {messages?.map((message) => (
                  <MessageBubble key={message.id} message={message} sellerId={sellerId}/>
                ))}
              </div>
              <Message sellerId={sellerId}/>
            </main>
          );

}

export default Chat;
