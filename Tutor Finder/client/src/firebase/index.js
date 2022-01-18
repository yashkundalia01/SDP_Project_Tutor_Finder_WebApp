// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import firebase from "firebase";
import { FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHBkeSB7JqUW9WqcZvtbFNZhrfFei_HLY",
  authDomain: "free-chat-7e7f7.firebaseapp.com",
  projectId: "free-chat-7e7f7",
  storageBucket: "free-chat-7e7f7.appspot.com",
  messagingSenderId: "585376801252",
  appId: "1:585376801252:web:f5690f7a50b48adc71a7f1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const mStorage = firebase.storage();

export default mStorage;
