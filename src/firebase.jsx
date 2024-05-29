/* Firebase */
import { initializeApp } from "firebase/app"; // firebase
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArOEMm9_9B8_7_QdgozYJtAtDvHqxlldI",
    authDomain: "campusxchange-633a6.firebaseapp.com",
    projectId: "campusxchange-633a6",
    storageBucket: "campusxchange-633a6.appspot.com",
    messagingSenderId: "1038793350652",
    appId: "1:1038793350652:web:9b376b768866b9214b6679"
  };
  
// initialize Firebase
export const app = initializeApp(firebaseConfig);

// auth export
export const auth = getAuth(app);

export const db = getDatabase();

export const firestore = getFirestore(app);

export const userAuth = onAuthStateChanged;

export const firebaseRef = ref;

export const getData = get;

export const setData = set;