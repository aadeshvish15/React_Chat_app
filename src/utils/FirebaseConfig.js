import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-chatapp-e95ee.firebaseapp.com",
  projectId: "react-chatapp-e95ee",
  storageBucket: "react-chatapp-e95ee.appspot.com",
  messagingSenderId: "912919136132",
  appId: "1:912919136132:web:2f0a350e033e217070bfd1"
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();