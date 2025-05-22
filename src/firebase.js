import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBz_rKfEvf05DEE4rfxPavI589L2iVAalc",
  authDomain: "schedula-maimuna-maliha.firebaseapp.com",
  projectId: "schedula-maimuna-maliha",
  storageBucket: "schedula-maimuna-maliha.appspot.com",
  messagingSenderId: "949850761042",
  appId: "1:949850761042:web:841ce07f8e8665ccf8bc8b",
  measurementId: "G-L8KSNS385Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
