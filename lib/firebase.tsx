// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// لو مش محتاجة Analytics احذفيه عادي
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvSGubtWL7UNGM9xOvl386UnwlBN1xe_w",
  authDomain: "greenmind-711be.firebaseapp.com",
  projectId: "greenmind-711be",
  storageBucket: "greenmind-711be.appspot.com", // عدلتها هنا
  messagingSenderId: "304895651584",
  appId: "1:304895651584:web:b2928fa63cfc153b5e0de5",
  measurementId: "G-KMGH12MR3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export app لو احتاجتيه
export default app;
