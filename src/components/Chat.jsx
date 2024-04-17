import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../Message";

const Chat = () => {
    const [messages, setMessages] = useState([]);

    // query firestore for 20 msgs at a time
    useEffect(() => {
        const q = query(
            collection(db, "messages"),
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
            <main className="chat-box">
              <div className="messages-wrapper">
                {messages?.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </div>
            </main>
          );

}
