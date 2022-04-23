// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtGs_d2b_VLIm3ReWL4RrvrWVr6UXBX9c",
  authDomain: "taller-react-firebase.firebaseapp.com",
  projectId: "taller-react-firebase",
  storageBucket: "taller-react-firebase.appspot.com",
  messagingSenderId: "324548260784",
  appId: "1:324548260784:web:2bbb5d0339ca43c69e5c75"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}