import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataSnapshot, onValue } from "firebase/database";

import logo from './logo.svg';
import './App.css';

/* Firebase */
import { initializeApp } from "firebase/app"; // firebase
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* Pages */
import Layout from "./pages/layout";
import Contact from "./pages/contact";
import TextBooks from "./pages/products/textbooks";

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
    if (user) {
      console.log(user.uid)
      setUser(user)
      writeUserData(user.uid, user.name, user.email)
      console.log(user)
    } else {
      console.log("user logged out")
    }
  })

  // initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const textbookCountRef = ref(database, '/textbooks');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} content={<TextBooks textbookCountRef={textbookCountRef} />} />} />
        <Route path="/profile" element={<Layout user={user} content={<Contact user={user} />} />} />
      </Routes>
    </BrowserRouter>
  );
};

// app export
export default App;
