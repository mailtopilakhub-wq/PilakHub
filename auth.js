import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "./firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Sign-Up Function
export function signUp(email, password, userData) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            // Save user data in real-time database
            set(ref(database, 'users/' + user.uid), {
                ...userData, // Spread user data
                email: email,
                createdAt: new Date().toISOString()
            });
            console.log("User signed up and data saved successfully!", user);
        })
        .catch((error) => {
            console.error("Error signing up: ", error.message);
        });
}

// Login Function
export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User signed in successfully!", user);
        })
        .catch((error) => {
            console.error("Error logging in: ", error.message);
        });
}