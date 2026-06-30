// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8hG3ZA7EmE9dmYTqEcVGU58n7GHWQKBw",
    authDomain: "wesleybianca.firebaseapp.com",
    projectId: "wesleybianca",
    storageBucket: "wesleybianca.firebasestorage.app",
    messagingSenderId: "263682328336",
    appId: "1:263682328336:web:b051b99623f3bce42a8795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export everything we'll use
export {
    db,
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,
    orderBy
};