// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvSGubtWL7UNGM9xOvl386UnwlBN1xe_w",
  authDomain: "greenmind-711be.firebaseapp.com",
  projectId: "greenmind-711be",
  storageBucket: "greenmind-711be.firebasestorage.app",
  messagingSenderId: "304895651584",
  appId: "1:304895651584:web:b2928fa63cfc153b5e0de5",
  measurementId: "G-KMGH12MR3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);