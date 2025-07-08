// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJW1i7r-WV-_K5O9K7ostOMFFcmxpmRkc",
  authDomain: "your-career-37d8c.firebaseapp.com",
  projectId: "your-career-37d8c",
  storageBucket: "your-career-37d8c.firebasestorage.app",
  messagingSenderId: "335515402036",
  appId: "1:335515402036:web:b76b80040381ca55846f61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
