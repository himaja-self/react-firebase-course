// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWEpl29U4WxeCN1xFGtqG9YZEvO_5G3_0",
  authDomain: "first-firebase-project-a9096.firebaseapp.com",
  projectId: "first-firebase-project-a9096",
  storageBucket: "first-firebase-project-a9096.firebasestorage.app",
  messagingSenderId: "167752249721",
  appId: "1:167752249721:web:0d537802cce9e449da7fa8",
  measurementId: "G-1959WS65PM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider(); //this is a provider hence no need to pass app
export const db = getFirestore(app);