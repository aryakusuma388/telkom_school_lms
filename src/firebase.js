// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAas5aSHzjXtE1ahPpevizKOFs-WT-LSRY",
  authDomain: "telkomschoollms.firebaseapp.com",
  projectId: "telkomschoollms",
  storageBucket: "telkomschoollms.firebasestorage.app",
  messagingSenderId: "4833498185",
  appId: "1:4833498185:web:c7161ffd8054644a86db98",
  measurementId: "G-G52V9PLNZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db }; // Ekspor Firestore untuk digunakan di komponen lain
// const analytics = getAnalytics(app);