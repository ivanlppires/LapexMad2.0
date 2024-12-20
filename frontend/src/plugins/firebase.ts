// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeRHCNed4ybCaCdxkrFe6OEqD9ufWxY3E",
  authDomain: "lapexmad-v2.firebaseapp.com",
  projectId: "lapexmad-v2",
  storageBucket: "lapexmad-v2.appspot.com",
  messagingSenderId: "1013745059309",
  appId: "1:1013745059309:web:0ffcc5b203c650b4db93e4"
};

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STOREGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig, import.meta.env.VITE_FIREBASE_PROJECT_ID);
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
