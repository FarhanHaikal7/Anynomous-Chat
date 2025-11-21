// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdbDeDkFmJ0rJNZ6FGP5_PkYiWCrMpQ08",
  authDomain: "polyglot-chat-9beb1.firebaseapp.com",
  projectId: "polyglot-chat-9beb1",
  storageBucket: "polyglot-chat-9beb1.firebasestorage.app",
  messagingSenderId: "926013470768",
  appId: "1:926013470768:web:cce20aa84623645e0c95f5",
  measurementId: "G-XSQLLY3EQZ",
  databaseURL: "https://polyglot-chat-9beb1-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);