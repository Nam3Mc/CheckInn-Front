// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbar_FhB70_XsMbEJ_DBjp_ZjbuHNXUD4",
  authDomain: "checkinn-b5d1b.firebaseapp.com",
  projectId: "checkinn-b5d1b",
  storageBucket: "checkinn-b5d1b.appspot.com",
  messagingSenderId: "117413340518",
  appId: "1:117413340518:web:55052163679e05bbb694a7",
  measurementId: "G-DM9TESWV55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
