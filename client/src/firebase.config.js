// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mindguide-45b3e.firebaseapp.com",
  projectId: "mindguide-45b3e",
  storageBucket: "mindguide-45b3e.appspot.com",
  messagingSenderId: "769817300398",
  appId: "1:769817300398:web:dce51faa843a5623628c3f",
  measurementId: "G-78N0TWEXB3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
