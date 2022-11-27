// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7G16eVyfX1NeizclD2x6mJL-7vdHjSEA",
    authDomain: "facebook-clone-nextjs-9df25.firebaseapp.com",
    projectId: "facebook-clone-nextjs-9df25",
    storageBucket: "facebook-clone-nextjs-9df25.appspot.com",
    messagingSenderId: "948611992290",
    appId: "1:948611992290:web:f53e7da29d0e6edf96acbb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage()

export { app, db, storage };