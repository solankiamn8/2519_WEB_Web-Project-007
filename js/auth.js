// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPbEu0S7_slJeXgXP3iK62RJQhUsndVDE",
  authDomain: "fitnessbuddy-ff511.firebaseapp.com",
  projectId: "fitnessbuddy-ff511",
  storageBucket: "fitnessbuddy-ff511.appspot.com",
  messagingSenderId: "500152952736",
  appId: "1:500152952736:web:976c42c8bf37fb5097a6c5",
  measurementId: "G-NG82JCDB36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Auth functions
const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  return signOut(auth);
};

const updateNavbar = () => {
  onAuthStateChanged(auth, (user) => {
    const authLinks = document.querySelectorAll('.auth-links');
    const loggedInLinks = document.querySelectorAll('.logged-in-links');
    const logoutBtn = document.getElementById('logout-btn');

    if (user) {
      authLinks.forEach(link => link.style.display = 'none');
      loggedInLinks.forEach(link => link.style.display = 'block');
      if (logoutBtn) logoutBtn.style.display = 'inline-block';
    } else {
      authLinks.forEach(link => link.style.display = 'block');
      loggedInLinks.forEach(link => link.style.display = 'none');
      if (logoutBtn) logoutBtn.style.display = 'none';
    }
  });
};

const checkAuthorization = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    }
  });
};

const handleLogout = () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logOut);
  }
};

// Export functions
export { signUp, login, logOut, updateNavbar, checkAuthorization, handleLogout };
