// Import necessary modules and Firebase methods
import { auth, getUserData } from './auth.js';
import { db } from './auth.js'; // Assuming getCurrentUser() is used to get user data, but using the user from auth state change
import { collection, getDocs, doc, updateDoc, addDoc } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

// Declare a variable to store the current user
let currentUser = null;

// Authentication check and user data
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";  // Redirect to login if no user
  } else {
    currentUser = user;  // Store the current authenticated user
    const userData = await getUserData(user.uid);  // Fetch user data from Firestore

    if (userData) {
      // Display user data on the page
      document.getElementById("user-name").innerText = `Name: ${userData.firstName} ${userData.lastName}`;
      document.getElementById("user-age").innerText = `Age: ${userData.age}`;
      document.getElementById("user-height").innerText = `Height: ${userData.height} cm`;
      document.getElementById("user-weight").innerText = `Weight: ${userData.weight} kg`;

      // Calculate BMI and display
      const heightInMeters = userData.height / 100;
      const bmi = userData.weight / (heightInMeters * heightInMeters);
      document.getElementById("user-bmi").innerText = `BMI: ${bmi.toFixed(2)}`;

      // Now that user data is loaded, call loadChallenges and loadWorkouts
      loadChallenges();
      loadWorkouts();
    }
  }
});

// Add new challenge functionality
document.getElementById("challenge-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const challengeType = document.getElementById("challenge-type").value;
  const challengeTarget = parseInt(document.getElementById("challenge-target").value);

  if (!challengeTarget) {
    alert("Please enter a target.");
    return;
  }

  // Create a new challenge object
  const challenge = {
    type: challengeType,
    target: challengeTarget,
    progress: 0
  };

  if (!currentUser) {
    console.error("No authenticated user found!");
    return;
  }

  // Add new challenge to the user's challenges collection
  const challengeRef = collection(db, 'users', currentUser.uid, 'challenges');
  const docRef = await addDoc(challengeRef, challenge);
  console.log("New challenge created with ID:", docRef.id);

  // Reload challenges after adding a new one
  loadChallenges();
});

// Load challenges from Firebase and display them
async function loadChallenges() {
  if (!currentUser) {
    console.error("No authenticated user found!");
    return;
  }

  const challengesRef = collection(db, 'users', currentUser.uid, 'challenges');
  const snapshot = await getDocs(challengesRef);
  const challengesContainer = document.getElementById('user-challenges');
  challengesContainer.innerHTML = '';  // Clear previous challenges

  snapshot.forEach(doc => {
    const challengeData = doc.data();
    const challengeElement = document.createElement('li');
    challengeElement.innerHTML = `
      <strong>${challengeData.type.charAt(0).toUpperCase() + challengeData.type.slice(1)} Challenge:</strong>
      <span>Target: ${challengeData.target}</span>
      <progress max="${challengeData.target}" value="${challengeData.progress}"></progress>
      <span class="progress-text">${challengeData.progress} / ${challengeData.target} ${challengeData.type}</span>
      <br>
      <button class="increase-progress-btn" data-challenge-id="${doc.id}" data-progress="${challengeData.progress}" data-target="${challengeData.target}" data-type="${challengeData.type}">Increase Progress</button>
    `;
    challengesContainer.appendChild(challengeElement);
  });
}

// Update progress for challenges
document.addEventListener("click", async function(event) {
  if (event.target.classList.contains('increase-progress-btn')) {
    const button = event.target;
    const challengeId = button.dataset.challengeId;
    let progress = parseInt(button.dataset.progress);
    const target = parseInt(button.dataset.target);

    if (progress >= target) {
      alert('You have already completed this challenge!');
      return;
    }

    progress += 1;
    button.dataset.progress = progress;

    if (!currentUser) {
      console.error("No authenticated user found!");
      return;
    }

    // Update the challenge progress in Firestore
    const challengeRef = doc(db, 'users', currentUser.uid, 'challenges', challengeId);
    await updateDoc(challengeRef, { progress: progress });

    // Reload challenges to reflect the updated progress
    loadChallenges();
  }
});

// Add new workout log
document.getElementById("workout-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const workoutType = document.getElementById("workout-type").value;
  const workoutDuration = parseInt(document.getElementById("workout-duration").value);

  if (!workoutDuration || workoutDuration <= 0) {
    alert("Please enter a valid workout duration.");
    return;
  }

  const workout = {
    type: workoutType,
    duration: workoutDuration,
    date: new Date().toISOString(),  // Store the date of the workout
  };

  if (!currentUser) {
    console.error("No authenticated user found!");
    return;
  }

  const workoutRef = collection(db, 'users', currentUser.uid, 'workouts');
  const docRef = await addDoc(workoutRef, workout);
  console.log("New workout logged with ID:", docRef.id);

  // Reload the workouts
  loadWorkouts();
});

// Load recent workouts from Firebase and display them
async function loadWorkouts() {
  if (!currentUser) {
    console.error("No authenticated user found!");
    return;
  }

  const workoutsRef = collection(db, 'users', currentUser.uid, 'workouts');
  const snapshot = await getDocs(workoutsRef);
  const workoutsContainer = document.getElementById('recent-workouts');
  workoutsContainer.innerHTML = ''; // Clear previous workouts

  snapshot.forEach(doc => {
    const workoutData = doc.data();
    const workoutElement = document.createElement('li');
    workoutElement.innerHTML = `
      <strong>${workoutData.type.charAt(0).toUpperCase() + workoutData.type.slice(1)}:</strong>
      <span>Duration: ${workoutData.duration} minutes</span>
      <br>
      <span>Date: ${new Date(workoutData.date).toLocaleDateString()}</span>
    `;
    workoutsContainer.appendChild(workoutElement);
  });
}
