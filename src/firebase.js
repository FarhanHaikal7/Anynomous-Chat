
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
