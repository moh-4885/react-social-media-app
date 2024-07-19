// Import the functions you need from the SDKs you need

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQ07lsIOX7S2s8p_4UW-WrJaAT3OLCvQ",
  authDomain: "react-app-97249.firebaseapp.com",
  projectId: "react-app-97249",
  storageBucket: "react-app-97249.appspot.com",
  messagingSenderId: "81093510866",
  appId: "1:81093510866:web:e29a31bae6f58d04274f0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
