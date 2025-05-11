# 2519_WEB_Web-Project-007 - Fitness Buddy Web App

## Introduction
Fitness Buddy is a web-based fitness application designed to help users track their fitness journey and connect with others who share similar fitness goals. Users can sign up, add personal details such as height, weight, and address, and then interact with others in the community who have similar goals and live in the same city. The app also allows users to track their BMI, set fitness challenges, and create workout logs.

## Project Type
**Frontend | Backend | Fullstack**  
This project is primarily **Frontend** with Firebase handling authentication and the Firestore database for storing user and community data.

## Deployed App
**Frontend:** [Fitness Buddy Web App (Netlify)](https://enchanting-kringle-d5a0cd.netlify.app/)  
**Backend:** N/A (Firebase handles backend services)  
**Database:** [Firestore Database](https://firestore.google.com/)

## Directory Structure
```plaintext
2519_WEB_Web-Project-007/
├── index.html
├── signup.html
├── login.html
├── dashboard.html
├── community.html
├── profile.html
├── js/
│   ├── dashboard.js
│   ├── auth.js
│   ├── profile.js
├── css/
│   ├── header.css
````

## Video Walkthrough of the Project

[Watch the Project Walkthrough (1-3 minutes)](https://youtu.be/ICrx-h_B5w0)

This video demonstrates the core features of the app, including user sign-up, BMI calculation, and interaction with the community.

## Video Walkthrough of the Codebase

[Watch the Codebase Walkthrough (1-5 minutes)](https://youtu.be/GeLy9knygN8)

A quick overview of the codebase, focusing on Firebase authentication, Firestore database interaction, and the UI components of the app.

## Features

* **User Authentication** – Sign up, log in, and log out using Firebase Authentication.
* **Personal Fitness Information** – Users can add details such as height, weight, and address to help personalize the fitness experience.
* **BMI Calculation** – After entering personal details, users can calculate their BMI and track their fitness progress.
* **Fitness Challenges** – Users can view and participate in fitness challenges that help them achieve their fitness goals.
* **Workout Logs** – Users can create, track, and update their workout logs.
* **Community Interaction** – Users can interact with other members based on shared goals and location. They can send messages and join fitness discussions.
* **Profile Management** – Users can view and edit their personal details and fitness information.
* **Responsive Design** – The app is optimized for mobile and desktop devices, providing a seamless user experience.

## Design Decisions or Assumptions

* **Firebase as a Backend Service**: Firebase was chosen to simplify backend management with real-time data syncing, authentication, and hosting.
* **LocalStorage for Session Management**: Session data is stored in LocalStorage for quick access without the need for cookies.
* **Mobile-First Approach**: Given the nature of the app, it was designed to be mobile-first, ensuring it’s easy to use while on the go.

## Installation & Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/2519_WEB_Web-Project-007.git
   cd 2519_WEB_Web-Project-007
   ```

2. No installation is required as the app is hosted on Firebase and uses CDN links.

3. Open `index.html` in your browser to view the app locally.

## Usage

1. **Sign Up**: Visit `signup.html` to create a new account.
2. **Log In**: Visit `login.html` to log in using your credentials.
3. **Dashboard**: Once logged in, you'll be redirected to `dashboard.html` where you can calculate your BMI, set fitness challenges, and track your workouts.
4. **Community Page**: Visit `community.html` to interact with others who have similar fitness goals or live in your city. Send messages, join discussions, and connect with others.
5. **Profile Page**: Visit `profile.html` to edit your details and keep track of your progress.

```bash
# Example:
Simply open the app in your browser to sign up, log in, and start tracking your fitness journey.
```

## Credentials

* **Sign up**: Create an account with your email and password.
* **Login**: Use the credentials created during sign-up to log in.

*Note: Firebase Authentication manages user authentication and session data.*

## APIs Used

* **Firebase Authentication API**: Handles sign-up, login, and user session management.

  * [Firebase Authentication Docs](https://firebase.google.com/docs/auth)

* **Firestore Database API**: Used for storing and managing user details, workout logs, fitness challenges, and messages.

  * [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)

## API Endpoints

Since this is a frontend-only app that uses Firebase, there are no custom API endpoints. The app interacts directly with Firebase services.

## Technology Stack

* **HTML**: Structure and layout of web pages.
* **CSS**: Styling and responsiveness of the app.
* **JavaScript**: Used for front-end logic and Firebase interaction.
* **Firebase Authentication**: Used for user authentication.
* **Firestore**: Used for storing user data, messages, workout logs, and fitness challenges.
* **LocalStorage**: Used to store session data locally in the browser.

