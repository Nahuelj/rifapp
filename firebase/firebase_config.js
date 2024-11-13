// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJnZbioKTjVG8CoDFzdIzQrL7CxtcCZLI",
  authDomain: "rifapp-63ea8.firebaseapp.com",
  projectId: "rifapp-63ea8",
  storageBucket: "rifapp-63ea8.firebasestorage.app",
  messagingSenderId: "221475141785",
  appId: "1:221475141785:web:58fe4d843b0ce7425de008",
  measurementId: "G-2VQBEVJLX7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
