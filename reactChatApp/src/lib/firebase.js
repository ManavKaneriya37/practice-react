import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-app-6f76d.firebaseapp.com",
  projectId: "react-chat-app-6f76d",
  storageBucket: "react-chat-app-6f76d.appspot.com",
  messagingSenderId: "944973689793",
  appId: "1:944973689793:web:49673c2d5b92c4de6db540",
  measurementId: "G-62KF0VV8GX"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()