import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataSnapshot, onValue } from "firebase/database";

import logo from './logo.svg';
import './App.css';

/* Firebase */
import { app, auth, db, firestore, firebaseRef, userAuth, getData, setData } from './firebase';

/* Pages */
import Layout from "./pages/layout";
import Contact from "./pages/contact";
import TextBooks from "./pages/products/textbooks";
import Posting from "./pages/posting";


// checking if email matches the domain
export function validAccount(userEmail){
	return userEmail.split('@')[1] == 'u.northwestern.edu';
}

// check if user exists before updating realtime db
export async function checkUserExists(userId) {
  return getData(firebaseRef(db, 'users/' + userId))
    .then(snapshot => {
      console.log("snapshot.exists: ", snapshot.exists());
      return snapshot.exists();
    })
  // return firebase.database().ref('users/' + userId).once('value')
  //   .then(snapshot => {
  //     return snapshot.exists();
  //   })
}

// write / update user data in realtime db
export async function writeUserData(userId, name, email) {
  let res = await checkUserExists(userId);
  if (!res) {
    setData(firebaseRef(db, 'users/' + userId), {
      name: name,
      email: email,
      transactions: 0,
      buyRating: 0,
      sellRating: 0
    });
  }
}

const App = () => {
  const [user, setUser] = useState("");

  userAuth(auth, (user) => {
    if (validAccount(user.email)) {
      setUser(user);
      writeUserData(user.uid, user.displayName, user.email);
      console.log("User Authed")
    } else {
      console.log("Not auth");
      alert("Not a Northwestern user. Please log in with a valid Northwestern email address.")
    }
  });

  // initialize Realtime Database and get a reference to the service
  const textbookCountRef = firebaseRef(db, '/textbooks');
  const usersCountRef = firebaseRef(db, '/users');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} content={<TextBooks textbookCountRef={textbookCountRef} />} />} />
        <Route path="/profile/:userid" element={<Layout user={user} content={<Contact textbookCountRef={textbookCountRef} usersCountRef={usersCountRef} curUser={user} firestore={firestore} />} />} />
        <Route path="/posting/:postid" element={<Layout user={user} content={<Posting textbookCountRef={textbookCountRef} curUser={user} />} />} />
      </Routes>
    </BrowserRouter>
  );
};

// app export
export default App;
