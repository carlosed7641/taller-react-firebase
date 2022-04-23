// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDctCB3I140N46a588V_GuDYzL8ZazdzTI",
  authDomain: "taller-react-firebase-b04d7.firebaseapp.com",
  projectId: "taller-react-firebase-b04d7",
  storageBucket: "taller-react-firebase-b04d7.appspot.com",
  messagingSenderId: "441715962184",
  appId: "1:441715962184:web:84c9c4c2cd2583bbe2037d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}