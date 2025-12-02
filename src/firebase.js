// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBxO4MIqvYq6QTKd_tl9DZF023sjgJ3w1Q",
  authDomain: "drivingwebapp-f4890.firebaseapp.com",
  projectId: "drivingwebapp-f4890",
  storageBucket: "drivingwebapp-f4890.appspot.com",
  messagingSenderId: "689016344652",
  appId: "1:689016344652:web:97a3fa9e3342958a97a4e9",
  measurementId: "G-6FR8EQS5CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication
export const auth = getAuth(app);
