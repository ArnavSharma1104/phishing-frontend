// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔒 Replace the values below with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC1FBkle-6hDrr7L1x9U_Hy3b0DrehvEMc",
  authDomain: "phishingawareness-b542c.firebaseapp.com",
  projectId: "phishingawareness-b542c",
  storageBucket: "phishingawareness-b542c.firebasestorage.app",
  messagingSenderId: "640122148130",
  appId: "1:640122148130:web:6e69b4404d7ed26dbb017b"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export the Firebase Auth object
export const auth = getAuth(app);
