// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAqzLEe6wIhyiPA0hT9jboZzaiNX8qQcM",
  authDomain: "pilakhub.firebaseapp.com",
  databaseURL: "https://pilakhub-default-rtdb.firebaseio.com",
  projectId: "pilakhub",
  storageBucket: "pilakhub.firebasestorage.app",
  messagingSenderId: "1030548447312",
  appId: "1:1030548447312:web:201e538c5d094edc04b155",
  measurementId: "G-C5N3N7CT4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);