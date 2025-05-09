import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPbEu0S7_slJeXgXP3iK62RJQhUsndVDE",
  authDomain: "fitnessbuddy-ff511.firebaseapp.com",
  projectId: "fitnessbuddy-ff511",
  storageBucket: "fitnessbuddy-ff511.firebasestorage.app",
  messagingSenderId: "500152952736",
  appId: "1:500152952736:web:dd5ff77a565c2b9b97a6c5",
  measurementId: "G-RZP42EPJ1Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
