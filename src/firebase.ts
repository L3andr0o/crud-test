// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbdgcIfrojHNDos5dDAtHWAYGZXw5LFgY",
  authDomain: "crud-test-32133.firebaseapp.com",
  projectId: "crud-test-32133",
  storageBucket: "crud-test-32133.appspot.com",
  messagingSenderId: "22700993346",
  appId: "1:22700993346:web:b021a8b891fea40b5c76db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;