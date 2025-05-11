import {
    getUserData,
    updateUserData,
    db,
    auth
} from './auth.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');
    const updateBtn = document.getElementById('updateBtn');
    const editBtn = document.getElementById('editBtn');
    const errorMsg = document.getElementById('error-message');
    const loadingIndicator = document.getElementById('loading-indicator');

    const userId = localStorage.getItem('userId');
    let currentProfile = null;

    // Function to fill the form with user data
    function fillForm(profile) {
        console.log("Filling form with data:", profile); // Debugging
        Object.entries(profile).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) field.value = value;
        });
    }

    // Function to toggle form elements (enable/disable)
    function toggleForm(disabled) {
        console.log("Toggling form. Disabled:", disabled); // Debugging
        [...form.elements].forEach(el => {
            if (el.tagName !== "BUTTON") el.disabled = disabled;
        });
    }

    // Function to check if a username is already taken
    async function isUsernameDuplicate(username) {
        const snapshot = await getDocs(collection(db, 'users'));
        return snapshot.docs.some(doc => {
            const data = doc.data();
            return data.username === username && doc.id !== userId; // Exclude the current user
        });
    }

    // Function to load the user profile
    async function loadUserProfile() {
        if (!userId) {
            console.log("No userId found, redirecting to login."); // Debugging
            window.location.href = 'login.html'; // Redirect to login if no userId
            return;
        }

        try {
            const data = await getUserData(userId);
            if (data && Object.keys(data).length > 0) {
                // Existing user profile
                currentProfile = data;
                fillForm(data);
                toggleForm(true); // Disable form fields if profile is loaded
                if (editBtn) editBtn.classList.remove('hidden'); // Show the edit button if exists
                console.log("Existing user profile loaded."); // Debugging

                // Cache locally
                localStorage.setItem('userStatus', 'existing');
                localStorage.setItem('userProfile', JSON.stringify(data));
            } else {
                // New user profile
                toggleForm(false); // Enable form for a new user to fill out
                if (editBtn) editBtn.classList.add('hidden'); // Hide the edit button if exists
                console.log("New user profile, edit button hidden."); // Debugging

                // Cache locally
                localStorage.setItem('userStatus', 'new');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            if (errorMsg) errorMsg.textContent = 'Failed to load profile.';
        }
    }

    // Event listener to enable form editing when the "edit" button is clicked
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            console.log("Edit button clicked."); // Debugging
            toggleForm(false); // Enable form editing
            if (editBtn) editBtn.classList.add('hidden'); // Hide the edit button while editing
            if (updateBtn) updateBtn.classList.remove('hidden'); // Show the submit button while editing
        });
    }

    // Event listener for form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (errorMsg) errorMsg.textContent = ''; // Clear previous error message

            const formData = {
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                username: form.username.value.trim(),
                age: parseInt(form.age.value),
                gender: form.gender.value,
                height: parseFloat(form.height.value),
                weight: parseFloat(form.weight.value),
                targetBMI: parseFloat(form.targetBMI.value),
                fitnessGoal: form.fitnessGoal.value,
                country: form.country.value.trim(),
                city: form.city.value.trim(),
                pinCode: form.pinCode.value.trim(),
                email: auth.currentUser?.email || ''
            };

            // Validate required fields
            if (
                !formData.firstName || !formData.lastName || !formData.username ||
                !formData.gender || !formData.country || !formData.city || !formData.pinCode ||
                formData.age <= 0 || formData.height <= 0 || formData.weight <= 0 || formData.targetBMI <= 0
            ) {
                if (errorMsg) errorMsg.textContent = 'Please fill out all fields correctly.';
                return;
            }

            // Check if the username is already taken
            const duplicate = await isUsernameDuplicate(formData.username);
            if (duplicate) {
                if (errorMsg) errorMsg.textContent = 'Username already exists. Please choose another.';
                return;
            }

            try {
                // Show loading indicator
                if (loadingIndicator) loadingIndicator.classList.remove('hidden');

                // Update user data in Firestore
                await updateUserData(userId, formData);

                // Update the profile in localStorage
                localStorage.setItem('userProfile', JSON.stringify(formData));
                localStorage.setItem('userStatus', 'existing');

                // Hide loading indicator
                if (loadingIndicator) loadingIndicator.classList.add('hidden');

                alert('Profile updated successfully!');
                window.location.href = 'dashboard.html';  // Redirect to the dashboard
            } catch (error) {
                console.error('Error saving profile:', error);
                if (errorMsg) errorMsg.textContent = 'Failed to save profile.';
            }
        });
    }

    // Initialize profile loading on page load
    loadUserProfile();
});
