import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace these placeholder values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVwCOOmfM5FEPIyrkreD94hr9YvuP_Dyw",
  authDomain: "language-589dd.firebaseapp.com",
  projectId: "language-589dd",
  storageBucket: "language-589dd.firebasestorage.app",
  messagingSenderId: "1020812265382",
  appId: "1:1020812265382:web:964f7f55ed4099b8667167"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
