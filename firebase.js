
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAyzr-9TrVLu0F9qHts8PJTiVd-Ig1xAB4",
    authDomain: "authentication-48d26.firebaseapp.com",
    projectId: "authentication-48d26",
    storageBucket: "authentication-48d26.firebasestorage.app",
    messagingSenderId: "481973762995",
    appId: "1:481973762995:web:6391aff0aa09965048a9c6",
    measurementId: "G-5KEWS16WQN"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

export {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider }