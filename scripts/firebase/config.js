// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcMtT-U-DDRVe5Zqb0aFqDZVqWJv1e1EM",
  authDomain: "vem-ser-tecnico.firebaseapp.com",
  projectId: "vem-ser-tecnico",
  storageBucket: "vem-ser-tecnico.firebasestorage.app",
  messagingSenderId: "443588265445",
  appId: "1:443588265445:web:778151c7bbcab74d659b0c",
  measurementId: "G-3R2FQTBGH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);