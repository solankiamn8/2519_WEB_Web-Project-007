import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence, 
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPbEu0S7_slJeXgXP3iK62RJQhUsndVDE",
  authDomain: "fitnessbuddy-ff511.firebaseapp.com",
  databaseURL: "https://fitnessbuddy-ff511-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fitnessbuddy-ff511",
  storageBucket: "fitnessbuddy-ff511.firebasestorage.app",
  messagingSenderId: "500152952736",
  appId: "1:500152952736:web:976c42c8bf37fb5097a6c5",
  measurementId: "G-NG82JCDB36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth functions with error handling and localStorage updates
const signUp = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user data to Firestore
    await setDoc(doc(db, 'users/' + user.uid), {
      email: email,
      ...userData
    });

    // Store userId in localStorage
    localStorage.setItem('userId', user.uid);

    return userCredential;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw new Error(error.message); // Or handle the error accordingly
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Store userId in localStorage
    localStorage.setItem('userId', userCredential.user.uid);

    return userCredential;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw new Error(error.message); // Or handle the error accordingly
  }
};

const logOut = async () => {
  try {
    // Set session persistence to none to clear the session data
    await setPersistence(auth, browserLocalPersistence);

    // Sign out the user
    await signOut(auth);

    // Clear user data from localStorage
    localStorage.removeItem('userId');

    // Log success
    console.log('User successfully logged out');

    // Redirect the user to the homepage or login page
    window.location.href = 'index.html'; // Adjust this based on your app structure

  } catch (error) {
    console.error("Error logging out: ", error);
    throw new Error(error.message); // Handle the error accordingly
  }
};

// Listen for auth state changes to reflect changes immediately
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is logged in:', user);
  } else {
    console.log('User is logged out');
  }
});

const getCurrentUser = () => {
  return auth.currentUser;
};

const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw new Error(error.message); // Or handle the error accordingly
  }
};

const updateUserData = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'users/' + userId), data);
  } catch (error) {
    console.error("Error updating user data: ", error);
    throw new Error(error.message); // Or handle the error accordingly
  }
};

// Export functions
export { 
  auth,
  db,
  signUp, 
  login, 
  logOut, 
  getCurrentUser,
  getUserData,
  updateUserData
};
