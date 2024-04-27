import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataSnapshot, onValue } from "firebase/database";

import logo from './logo.svg';
import './App.css';

/* Firebase */
import { initializeApp } from "firebase/app"; // firebase
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

/* Pages */
import Layout from "./pages/layout";
import Contact from "./pages/contact";
import TextBooks from "./pages/products/textbooks";
import Posting from "./pages/posting";

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
// auth export
export const auth = getAuth(app);

// checking if email matches the domain
function validAccount(userEmail){
	return userEmail.split('@')[1] == 'u.northwestern.edu';
}

// check if user exists before updating realtime db
async function checkUserExists(userId) {
  const db = getDatabase();

  return get(ref(db, 'users/' + userId))
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
async function writeUserData(userId, name, email) {
  let res = await checkUserExists(userId);
  const db = getDatabase();
  if (!res) {
    console.log("WRITING");
    set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      transactions: 0,
      buyRating: 0,
      sellRating: 0
    });
  }
}

const App = () => {
  const [user, setUser] = useState("")

  onAuthStateChanged(auth, (user) => {
    if (validAccount(user.email)) {
      setUser(user);
      writeUserData(user.uid, user.displayName, user.email);
      console.log("User Authed")
    } else {
      console.log("Not auth");
    }
  });

  // initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const textbookCountRef = ref(database, '/textbooks');
  const usersCountRef = ref(database, '/users');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} content={<TextBooks textbookCountRef={textbookCountRef} />} />} />
        <Route path="/profile/:userid" element={<Layout user={user} content={<Contact textbookCountRef={textbookCountRef} usersCountRef={usersCountRef} curUser={user} />} />} />
        <Route path="/posting/:postid" element={<Layout user={user} content={<Posting textbookCountRef={textbookCountRef} curUser={user} />} />} />
      </Routes>
    </BrowserRouter>
  );
};

// app export
export default App;
