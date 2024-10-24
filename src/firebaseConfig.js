// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM9La170Ubt70dsi1QdGwtWkxS3oYWVtw",
  authDomain: "todo-ecc09.firebaseapp.com",
  projectId: "todo-ecc09",
  storageBucket: "todo-ecc09.appspot.com",
  messagingSenderId: "520023052719",
  appId: "1:520023052719:web:b1f5e5309a3cc819e05f5a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
