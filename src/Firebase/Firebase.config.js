// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQF0OgWd3vx0t_Nyxsckyy31FLpi6qg7o",
  authDomain: "simple-firebase-1205f.firebaseapp.com",
  projectId: "simple-firebase-1205f",
  storageBucket: "simple-firebase-1205f.appspot.com",
  messagingSenderId: "933595953246",
  appId: "1:933595953246:web:0794960fe612dcf8e11ccf",
  measurementId: "G-2Q5EQM0K9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth