// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realtor-app-401601.firebaseapp.com",
  projectId: "realtor-app-401601",
  storageBucket: "realtor-app-401601.appspot.com",
  messagingSenderId: "608912188987",
  appId: "1:608912188987:web:17db51f81e3fba36a35e1e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
