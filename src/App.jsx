import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

/* Firebase */
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {getAuth} from "firebase/auth";
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

const App = () => {

  // initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const textbookCountRef = ref(database, '/textbooks');

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<TextBooks textbookCountRef={textbookCountRef} />}/>} />
        <Route path="/contact" element={<Layout content={<Contact />}/>} />
      </Routes>
    </BrowserRouter>
  );
};

// app export
export default App;
