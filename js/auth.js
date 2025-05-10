import { getFirestore, doc, setDoc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider,
  signInWithPopup
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

// Auth functions
const signUp = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save additional user data to Firestore
  await setDoc(doc(db, 'users/' + user.uid), {
    email: email,
    ...userData
  });

  return userCredential;
};

const login = async(email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const logOut = () => {
  localStorage.removeItem('userId')
  return signOut(auth);
};

const getCurrentUser = () => {
  return auth.currentUser;
};

const getUserData = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? userDoc.data() : null;
};

const updateUserData = async (userId, data) => {
  await updateDoc(doc(db, 'users/' + userId), data);
};

// Export functions
export { 
  auth,
  db,
  signUp, 
  login, 
  googleLogin,
  logOut, 
  getCurrentUser,
  getUserData,
  updateUserData
};