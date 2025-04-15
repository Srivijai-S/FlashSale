// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJhbojN8P5sWgIayi2Do8yuwiJ8LGW96A",
  authDomain: "flashsale-6e233.firebaseapp.com",
  projectId: "flashsale-6e233",
  storageBucket: "flashsale-6e233.firebasestorage.app",
  messagingSenderId: "92004890136",
  appId: "1:92004890136:web:5d7cf3cf14750544dbb56d",
  measurementId: "G-FGCMBW6F34",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
