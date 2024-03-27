// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWso_4kwJWx_4jNQ8R5OgzPrV_WybQbko",
  authDomain: "metrogroups-a7f4b.firebaseapp.com",
  projectId: "metrogroups-a7f4b",
  storageBucket: "metrogroups-a7f4b.appspot.com",
  messagingSenderId: "540416490328",
  appId: "1:540416490328:web:db93ca3caf69e034f7032d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);                // Aquí se encuentran todos los datos de la Firestore.
export const auth = getAuth(app);
export const storage = getStorage(app);