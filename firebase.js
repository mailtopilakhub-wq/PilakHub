// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAqzLEe6wIhyiPA0hT9jboZzaiNX8qQcM",
  authDomain: "pilakhub.firebaseapp.com",
  projectId: "pilakhub",
  storageBucket: "pilakhub.firebasestorage.app",
  messagingSenderId: "1030548447312",
  appId: "1:1030548447312:web:201e538c5d094edc04b155",
  measurementId: "G-C5N3N7CT4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);