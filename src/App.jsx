import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataSnapshot, onValue } from "firebase/database";


import logo from './logo.svg';
import './App.css';

/* Firebase */
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

/* Pages */
import Layout from "./pages/layout";
import Contact from "./pages/contact";
import TextBooks from "./pages/products/textbooks";

const App = () => {

  // Firebase Realtime Database
  const firebaseConfig = {
    databaseURL: "https://campus-xchange-default-rtdb.firebaseio.com",
  };

  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  // initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const textbookCountRef = ref(database, '/textbooks');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<TextBooks textbookCountRef={textbookCountRef} />} />} />
        <Route path="/contact" element={<Layout content={<Contact />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
