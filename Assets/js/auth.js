// auth.js
import { auth, db } from "./Assets/.secret/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ============================
// LOGIN
// ============================
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  loginError.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    loginError.textContent = error.message.replace("Firebase:", "");
  }
});

// ============================
// REGISTER
// ============================
const registerForm = document.getElementById("register-form");
const registerError = document.getElementById("register-error");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const mobile = document.getElementById("reg-mobile").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const referral = document.getElementById("reg-referral")?.value.trim() || "";

  registerError.textContent = "";

  if (mobile.length < 10) {
    registerError.textContent = "Please enter a valid mobile number.";
    return;
  }

  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    // Save user profile to Firestore
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      mobile,
      referralCode: referral,
      createdAt: serverTimestamp()
    });

    window.location.href = "dashboard.html";

  } catch (error) {
    registerError.textContent = error.message.replace("Firebase:", "");
  }
});