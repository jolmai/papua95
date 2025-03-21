// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOUgtl3q6SImeyphxlCuYl1yAcLUokCY4",
  authDomain: "papua-b4c50.firebaseapp.com",
  projectId: "papua-b4c50",
  storageBucket: "papua-b4c50.firebasestorage.app",
  messagingSenderId: "467265508938",
  appId: "1:467265508938:web:ae29449d0d623af44738b3",
  measurementId: "G-1R529SEJ35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 