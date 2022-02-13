// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDyDFqTjVnT35NQAIXsg7mnjtPek9EIWNg",

  authDomain: "entertainment-tracker-4d708.firebaseapp.com",

  projectId: "entertainment-tracker-4d708",

  storageBucket: "entertainment-tracker-4d708.appspot.com",

  messagingSenderId: "884503510422",

  appId: "1:884503510422:web:8c4013d36628e11af171b7",

  measurementId: "G-E7S2WG8ND9",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
