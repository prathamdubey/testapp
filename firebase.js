// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnpA8Wu-jQLquRaA0Jc32FRG4Lxv99T6o",
  authDomain: "mychatapp-9b492.firebaseapp.com",
  projectId: "mychatapp-9b492",
  storageBucket: "mychatapp-9b492.appspot.com",
  messagingSenderId: "656452981295",
  appId: "1:656452981295:web:0d37dea1b4acc1d2da6cda",
  measurementId: "G-228T2G5F4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}