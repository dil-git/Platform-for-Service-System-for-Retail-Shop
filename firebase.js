// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB2HIrKi1wk7BoDAYmxGstkkpGCuG9mHoM",
  authDomain: "sample-srms.firebaseapp.com",
  projectId: "sample-srms",
  storageBucket: "sample-srms.appspot.com",
  messagingSenderId: "465489125710",
  appId: "1:465489125710:web:070ff733015dfc189f7e1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc };